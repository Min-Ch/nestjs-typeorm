import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Users } from '../../entities/Users';
import { UsersService } from '../users.service';
import { ApiConfigService } from '../../config/api-config.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private userService: UsersService,
    private configService: ApiConfigService,
  ) {
    super({
      secretOrKey: configService.authConfig.refreshPublicKey,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      algorithms: ['RS256'],
    });
  }

  async validate(payload) {
    console.log(payload);
    const user: Users = await this.userService.tokenValidateUser(payload);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
