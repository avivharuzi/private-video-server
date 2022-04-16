import { Module } from '@nestjs/common';

import { BrowseController } from './browse.controller';
import { BrowseService } from './browse.service';

@Module({
  providers: [BrowseService],
  controllers: [BrowseController],
})
export class BrowseModule {}
