import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '../entity';
import { VideoEntity } from '../videos';

@Entity()
export class CollectionEntity extends BaseEntity {
  @Column()
  name!: string;

  @Column('simple-array')
  directories!: string[];

  @OneToMany(() => VideoEntity, (video) => video.collection)
  videos!: VideoEntity[];
}
