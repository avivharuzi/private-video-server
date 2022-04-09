import { Column, Entity, ManyToOne } from 'typeorm';

import { CollectionEntity } from '../collections';
import { BaseEntity } from '../entity';
import { VideoInfo } from '../utils';

@Entity()
export class VideoEntity extends BaseEntity {
  @Column()
  title!: string;

  @Column()
  path!: string;

  @Column('simple-json')
  info!: VideoInfo;

  @Column({
    nullable: true,
  })
  thumbnail!: string;

  @Column('simple-array')
  thumbnails!: string[];

  @Column({
    nullable: true,
  })
  preview!: string;

  @Column('simple-array')
  previews!: string[];

  @ManyToOne(() => CollectionEntity, (collection) => collection.videos)
  collection!: CollectionEntity;
}
