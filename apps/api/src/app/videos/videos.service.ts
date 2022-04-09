import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as fastGlob from 'fast-glob';
import * as mkdirp from 'mkdirp';
import * as path from 'node:path';
import { Repository } from 'typeorm';

import { CollectionEntity } from '../collections';
import { EnvironmentVariables } from '../environment-variables';
import {
  createFullVideoPreview,
  getVideoInfo,
  takeScreenshots,
} from '../utils';
import { VIDEO_EXTENSIONS } from '../utils/video-extensions';
import { VideoEntity } from './video.entity';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(VideoEntity)
    private readonly videoRepository: Repository<VideoEntity>,
    private readonly configService: ConfigService<EnvironmentVariables>
  ) {}

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
    directory: string
  ): Promise<VideoEntity[]> {
    const patterns: string[] = [];

    for (const extension of VIDEO_EXTENSIONS) {
      patterns.push(`${directory}/**/*${extension}`);
    }

    const filesPaths = await fastGlob(patterns);

    const createVideoPromises = filesPaths.map((filePath) =>
      this.createOne(collection, filePath)
    );

    return Promise.all(createVideoPromises);
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

    const mediaDirectory = this.configService.get('API_MEDIA_DIRECTORY');
    const thumbnailsDirectory = path.join(
      mediaDirectory,
      video.id,
      'thumbnails'
    );
    const previewsDirectory = path.join(mediaDirectory, video.id, 'previews');

    await Promise.all([mkdirp(thumbnailsDirectory), mkdirp(previewsDirectory)]);

    const takeScreenshotsPromise = takeScreenshots(filePath, {
      count: 10,
      startPositionPercent: 5,
      endPositionPercent: 95,
      directory: thumbnailsDirectory,
    });

    const createFullVideoPreviewPromise = createFullVideoPreview(filePath, {
      directory: previewsDirectory,
      numberOfParts: 5,
      eachPartTimeInSeconds: 3,
      startPositionPercent: 5,
      endPositionPercent: 95,
      videoInfo,
    });

    const [thumbnails, fullVideoPreviewOutput] = await Promise.all([
      takeScreenshotsPromise,
      createFullVideoPreviewPromise,
    ]);

    video.defaultThumbnail = thumbnails[0] || '';
    video.thumbnails = thumbnails;
    video.defaultPreview = fullVideoPreviewOutput.videoPreviewFilePath;
    video.previews = fullVideoPreviewOutput.filePaths;

    await this.videoRepository.save(video);

    return video;
  }
}
