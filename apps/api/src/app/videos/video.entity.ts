import { Column, Entity, ManyToOne } from 'typeorm';

import { CollectionEntity } from '../collections';
import { BaseEntity } from '../entity';
import { VideoInfo } from '../utils';

@Entity()
export class VideoEntity extends BaseEntity {
  @Column()
  title!: string;

  @Column()
  filePath!: string;

  @Column('simple-json')
  info!: VideoInfo;

  @Column({
    nullable: true,
  })
  mediaDirectory!: string;

  @Column({
    nullable: true,
  })
  defaultThumbnail!: string;

  @Column('simple-array')
  thumbnails!: string[];

  @Column({
    nullable: true,
  })
  defaultPreview!: string;

  @Column('simple-array')
  previews!: string[];

  @ManyToOne(() => CollectionEntity, (collection) => collection.videos)
  collection!: CollectionEntity;
}
