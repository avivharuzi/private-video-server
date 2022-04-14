import { Module } from '@nestjs/common';

import { VideosModule } from '../videos';
import { StreamPathPipe } from './stream-path.pipe';
import { StreamController } from './stream.controller';
import { StreamService } from './stream.service';

@Module({
  imports: [VideosModule],
  controllers: [StreamController],
  providers: [StreamPathPipe, StreamService],
})
export class StreamModule {}
