import { Body, Controller, Get, Post, Request } from '@nestjs/common';

import { Request as ExpressRequest } from 'express';

import { Public } from '../public';
import { AuthToken } from './auth-token';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() authDto: AuthDto): Promise<AuthToken> {
    return this.authService.login(authDto);
  }

  @Get('profile')
  getProfile(@Request() req: ExpressRequest) {
    return {
      username: req.user,
    };
  }
}
