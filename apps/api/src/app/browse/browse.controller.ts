import { Controller, Get, Param } from '@nestjs/common';

import { BrowseService } from './browse.service';

@Controller('browse')
export class BrowseController {
  constructor(private readonly browseService: BrowseService) {}

  @Get()
  findAll() {
    return this.browseService.findAll('/');
  }

  @Get(':path')
  findAllByPath(@Param('path') path: string) {
    return this.browseService.findAll(path);
  }
}
