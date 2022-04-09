import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { VideosService } from '../videos/videos.service';
import { CollectionEntity } from './collection.entity';
import { CreateCollectionDto } from './dto';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(CollectionEntity)
    private readonly collectionRepository: Repository<CollectionEntity>,
    private readonly videosService: VideosService
  ) {}

  findAll(): Promise<CollectionEntity[]> {
    return this.collectionRepository.find();
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
    createCollectionDto: CreateCollectionDto
  ): Promise<CollectionEntity> {
    const collection = await this.collectionRepository.save(
      createCollectionDto
    );

    const { directories } = collection;

    const createVideosPromises = directories.map((directory) =>
      this.videosService.createMany(collection, directory)
    );

    await Promise.all(createVideosPromises);

    return collection;
  }
}
