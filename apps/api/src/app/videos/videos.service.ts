import * as fs from 'node:fs';
import * as path from 'node:path';

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as del from 'del';
import * as fastGlob from 'fast-glob';
import * as mkdirp from 'mkdirp';
import { Repository } from 'typeorm';

import { VideoQueryParams } from '@private-video-server/collections/data-access';

import { CollectionEntity } from '../collections';
import { EnvironmentVariables } from '../environment-variables';
import {
  addCoverImageToVideoWithBuffer,
  createFullVideoPreview,
  CreateFullVideoPreviewOutput,
  generateUUID,
  getVideoInfo,
  shrinkImage,
  takeScreenshots,
} from '../utils';
import { saveVideoCoverImage } from '../utils/save-video-cover-image';
import { VIDEO_EXTENSIONS } from '../utils/video-extensions';
import { VideoEntity } from './video.entity';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(VideoEntity)
    private readonly videoRepository: Repository<VideoEntity>,
    private readonly configService: ConfigService<EnvironmentVariables>
  ) {}

  async findAll({
    searchTerm,
    limit,
  }: Partial<VideoQueryParams>): Promise<VideoEntity[]> {
    let queryBuilder = this.videoRepository
      .createQueryBuilder('videos')
      .select();

    if (searchTerm) {
      queryBuilder = queryBuilder.where('title LIKE :searchTerm', {
        searchTerm: `%${searchTerm}%`,
      });
    }

    queryBuilder = queryBuilder.leftJoinAndSelect(
      'videos.collection',
      'collection'
    );

    if (limit && !isNaN(limit)) {
      queryBuilder = queryBuilder.limit(limit);
    }

    return queryBuilder.getMany();
  }

  async findOne(id: string): Promise<VideoEntity> {
    const video = await this.videoRepository.findOne({
      where: {
        id,
      },
    });

    if (!video) {
      throw new NotFoundException();
    }

    return video;
  }

  async createMany(
    collection: CollectionEntity,
    directory: string,
    existingFilesPaths: string[] = []
  ): Promise<VideoEntity[]> {
    const filesPaths = await this.getFilesPaths(directory);

    const videos: VideoEntity[] = [];

    for (const filePath of filesPaths) {
      if (existingFilesPaths.includes(filePath)) {
        continue;
      }

      const video = await this.createOne(collection, filePath);

      videos.push(video);
    }

    return videos;
  }

  async createOne(
    collection: CollectionEntity,
    filePath: string
  ): Promise<VideoEntity> {
    const fileStat = path.parse(filePath);
    const videoInfo = await getVideoInfo(filePath);

    const video = await this.videoRepository.save({
      title: fileStat.name,
      filePath,
      info: videoInfo,
      thumbnails: [] as string[],
      previews: [] as string[],
      collection,
    });

    const mediaDirectory = path.join(
      this.configService.get('API_MEDIA_DIRECTORY') || '',
      video.id
    );
    const thumbnailsDirectory = path.join(mediaDirectory, 'thumbnails');
    const previewsDirectory = path.join(mediaDirectory, 'previews');

    await Promise.all([mkdirp(thumbnailsDirectory), mkdirp(previewsDirectory)]);

    let coverThumbnail = null;
    let thumbnails: string[] = [];
    let fullVideoPreviewOutput: CreateFullVideoPreviewOutput | null = null;

    try {
      coverThumbnail = await saveVideoCoverImage(filePath, thumbnailsDirectory);
    } catch (error) {
      Logger.error(error, `coverThumbnail, ${filePath}`);
    }

    try {
      thumbnails = await takeScreenshots(filePath, {
        count: 1,
        startPositionPercent: 5,
        endPositionPercent: 95,
        directory: thumbnailsDirectory,
      });
    } catch (error) {
      Logger.error(error, `thumbnails, ${filePath}`);
    }

    try {
      fullVideoPreviewOutput = await createFullVideoPreview(filePath, {
        directory: previewsDirectory,
        numberOfParts: 5,
        eachPartTimeInSeconds: 3,
        startPositionPercent: 5,
        endPositionPercent: 95,
        videoInfo,
      });
    } catch (error) {
      Logger.error(error, `fullVideoPreviewOutput, ${filePath}`);
    }

    video.mediaDirectory = mediaDirectory;
    if (coverThumbnail !== null) {
      video.coverThumbnail = coverThumbnail;
    }
    video.defaultThumbnail = thumbnails[0] || '';
    video.thumbnails = thumbnails;
    if (fullVideoPreviewOutput !== null) {
      video.defaultPreview = fullVideoPreviewOutput.videoPreviewFilePath;
      video.previews = fullVideoPreviewOutput.filePaths;
    }

    await this.videoRepository.save(video);

    return video;
  }

  async deleteOne(id: string): Promise<VideoEntity> {
    const video = await this.findOne(id);

    const mediaDirectory = video.mediaDirectory;

    if (mediaDirectory) {
      await del(mediaDirectory);
    }

    await this.videoRepository.delete(id);

    return video;
  }

  async changeCoverThumbnail(
    id: string,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    coverThumbnail: Express.Multer.File
  ): Promise<VideoEntity> {
    const video = await this.findOne(id);

    const videoFilePath = video.filePath;

    const thumbnailsDirectory = path.join(video.mediaDirectory, 'thumbnails');

    let newCoverThumbnail: string | null = null;
    try {
      const coverImageFilePath = path.join(
        thumbnailsDirectory,
        `${generateUUID()}-cover.jpg`
      );

      await shrinkImage(coverThumbnail.buffer, coverImageFilePath);

      newCoverThumbnail = coverImageFilePath;
    } catch (error) {
      Logger.error(error, `coverThumbnail, ${videoFilePath}`);
    }

    if (newCoverThumbnail) {
      await this.updateOldCoverThumbnailWithNewOne(video, newCoverThumbnail);
    }

    return this.findOne(id);
  }

  async changeCoverThumbnailOfVideoFile(
    id: string,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    coverThumbnail: Express.Multer.File
  ): Promise<VideoEntity> {
    const video = await this.findOne(id);

    const thumbnailsDirectory = path.join(video.mediaDirectory, 'thumbnails');

    const videoFilePath = video.filePath;

    await addCoverImageToVideoWithBuffer(videoFilePath, {
      coverImage: coverThumbnail.buffer,
      coverImageFileName: coverThumbnail.originalname,
      coverImageDirectory: thumbnailsDirectory,
    });

    let newCoverThumbnail: string | null = null;
    try {
      newCoverThumbnail = await saveVideoCoverImage(
        videoFilePath,
        thumbnailsDirectory
      );
    } catch (error) {
      Logger.error(error, `coverThumbnail, ${videoFilePath}`);
    }

    if (newCoverThumbnail) {
      await this.updateOldCoverThumbnailWithNewOne(video, newCoverThumbnail);
    }

    return this.findOne(id);
  }

  async getFilesPaths(directory: string): Promise<string[]> {
    const patterns: string[] = [];

    for (const extension of VIDEO_EXTENSIONS) {
      patterns.push(`${directory}/**/*${extension}`);
    }

    return fastGlob(patterns);
  }

  private async updateOldCoverThumbnailWithNewOne(
    video: VideoEntity,
    newCoverThumbnail: string
  ): Promise<void> {
    const oldCoverThumbnail = video.coverThumbnail;

    video.coverThumbnail = newCoverThumbnail;
    await this.videoRepository.save(video);

    if (oldCoverThumbnail) {
      await fs.promises.rm(oldCoverThumbnail);
    }
  }
}
