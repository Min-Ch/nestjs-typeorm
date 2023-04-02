import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersRepository } from '../repositories/users.repository';
import * as bcrypt from 'bcryptjs';
import { Payload } from './auth/payload.interface';
import { JwtService } from '@nestjs/jwt';
import { ApiConfigService } from '../config/api-config.service';
import { Users } from '../entities/Users';
import { AuthCredentialDto } from './dto/auth.request.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ApiConfigService,
  ) {}
  // getUser() {}

  async postUsers(joinRequestDto: JoinRequestDto) {
    await this.userRepository.createUser(joinRequestDto);
  }

  async logIn(authCredentialDto: AuthCredentialDto) {
    const { email, password } = authCredentialDto;
    const user = await this.userRepository.findOneBy({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: Payload = {
        id: user.id,
        email: user.email,
      };
      return this.createTokens(payload);
    } else {
      throw new UnauthorizedException('logIn failed');
    }
  }

  async refreshTokens(user: Users) {
    const payload: Payload = { id: user.id, email: user.email };
    return this.createTokens(payload);
  }

  async createTokens(payload: Payload) {
    const accessToken = await this.createAccessToken(payload);
    const refreshToken = await this.createRefreshToken(payload);
    return {
      refreshExpireIn: this.configService.authConfig.refreshExpirationTime,
      accessExpireIn: this.configService.authConfig.accessExpirationTime,
      accessToken,
      refreshToken,
    };
  }

  async createAccessToken(payload: Payload) {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.authConfig.accessSecretKey,
      algorithm: 'HS256',
      expiresIn: this.configService.authConfig.accessExpirationTime,
    });
  }

  async createRefreshToken(payload: Payload) {
    return await this.jwtService.signAsync(payload);
  }

  async tokenValidateUser(payload: Payload) {
    return await this.userRepository.findOne({
      where: { id: payload.id, email: payload.email, deletedAt: null },
    });
  }
}
