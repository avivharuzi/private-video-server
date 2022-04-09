import { Module } from '@nestjs/common';

import { VideosModule } from '../videos';
import { StreamPathPipe } from './stream-path.pipe';
import { StreamController } from './stream.controller';

@Module({
  imports: [VideosModule],
  controllers: [StreamController],
  providers: [StreamPathPipe],
})
export class StreamModule {}
