import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from '../repositories/users.repository';
import { TypeOrmExModule } from '../common/typeorm-ex.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccessTokenStrategy } from './auth/accessToken.strategy';
import { ApiConfigService } from '../config/api-config.service';
import { RefreshTokenStrategy } from './auth/refreshToken.strategy';
import { ApiConfigModule } from '../config/api-config.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([UsersRepository]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ApiConfigService) => ({
        privateKey: configService.authConfig.refreshPrivateKey,
        publicKey: configService.authConfig.refreshPublicKey,
        signOptions: {
          algorithm: 'RS256',
          expiresIn: configService.authConfig.refreshExpirationTime,
        },
        verifyOptions: {
          algorithms: ['RS256'],
        },
      }),
      inject: [ApiConfigService],
      imports: [ApiConfigModule],
    }),
  ],
  exports: [UsersService, JwtModule],
  providers: [UsersService, AccessTokenStrategy, RefreshTokenStrategy],
  controllers: [UsersController],
})
export class UsersModule {}
