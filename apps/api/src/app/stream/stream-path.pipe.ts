import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvironmentVariables } from '../environment-variables';

@Injectable()
export class StreamPathPipe implements PipeTransform {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  transform(value: string, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param') {
      throw new BadRequestException();
    }

    const path = decodeURIComponent(value);
    const mediaDirectory = this.configService.get('API_MEDIA_DIRECTORY');

    if (!path.startsWith(mediaDirectory)) {
      throw new BadRequestException();
    }

    return path;
  }
}
