import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { isFileExists } from '../utils';
import { VideosService } from '../videos/videos.service';
import { CollectionEntity } from './collection.entity';
import { CreateCollectionDto } from './dto';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(CollectionEntity)
    private readonly collectionRepository: Repository<CollectionEntity>,
    private readonly videosService: VideosService,
  ) {}

  findAll(): Promise<CollectionEntity[]> {
    return this.collectionRepository.find({
      order: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string): Promise<CollectionEntity> {
    const collection = await this.collectionRepository.findOne({
      where: {
        id,
      },
      relations: ['videos'],
    });

    if (!collection) {
      throw new NotFoundException();
    }

    return collection;
  }

  async create(
    createCollectionDto: CreateCollectionDto,
  ): Promise<CollectionEntity> {
    const collection =
      await this.collectionRepository.save(createCollectionDto);

    const { directories } = collection;

    const createVideosPromises = directories.map((directory) =>
      this.videosService.createMany(collection, directory),
    );

    await Promise.all(createVideosPromises);

    return collection;
  }

  async refresh(id: string): Promise<CollectionEntity> {
    const collection = await this.findOne(id);

    const { directories } = collection;

    const existingVideosFilesPaths = collection.videos.map(
      (video) => video.filePath,
    );

    const createVideosPromises = directories.map((directory) =>
      this.videosService.createMany(
        collection,
        directory,
        existingVideosFilesPaths,
      ),
    );

    await Promise.all(createVideosPromises);

    await this.deleteNotExistsVideos(id);

    return this.findOne(id);
  }

  async delete(id: string): Promise<CollectionEntity> {
    const collection = await this.findOne(id);

    const deletePromises = collection.videos.map((video) =>
      this.videosService.deleteOne(video.id),
    );

    await Promise.all(deletePromises);

    await this.collectionRepository.delete(id);

    return collection;
  }

  async deleteNotExistsVideos(id: string): Promise<void> {
    const collection = await this.findOne(id);

    const deletePromises = collection.videos.map(async (video) => {
      const isVideoFilePathExists = await isFileExists(video.filePath);
      if (isVideoFilePathExists) {
        return video;
      }

      return this.videosService.deleteOne(video.id);
    });

    await Promise.all(deletePromises);
  }
}
