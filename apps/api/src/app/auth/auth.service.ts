import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { AuthToken } from './auth-token';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ username, password }: AuthDto): Promise<AuthToken> {
    const adminUsername = this.configService.get('API_ADMIN_USERNAME');
    const adminPassword = this.configService.get('API_ADMIN_PASSWORD');

    const hasMatch = username === adminUsername && password === adminPassword;

    if (!hasMatch) {
      throw new ForbiddenException('Username or password is invalid');
    }

    return this.signToken(username);
  }

  async signToken(username: string): Promise<AuthToken> {
    const payload = {
      sub: username,
    };

    const secret = this.configService.get('API_JWT_SECRET');

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
      secret,
    });

    return {
      accessToken: token,
    };
  }
}
