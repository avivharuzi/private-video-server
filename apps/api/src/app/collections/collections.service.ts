import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CollectionEntity } from './collection.entity';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(CollectionEntity)
    private readonly collectionRepository: Repository<CollectionEntity>
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
}
