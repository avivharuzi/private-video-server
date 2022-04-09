import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { VideoEntity } from './video.entity';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(VideoEntity)
    private readonly videoRepository: Repository<VideoEntity>
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
}
