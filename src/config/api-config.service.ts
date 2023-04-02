import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { isNil } from 'lodash';
import { Users } from '../entities/Users';
import { Channels } from '../entities/Channels';
import { ChannelMembers } from '../entities/ChannelMembers';
import { ChannelChats } from '../entities/ChannelChats';
import { DMs } from '../entities/DMs';
import { Mentions } from '../entities/Mentions';
import { WorkspaceMembers } from '../entities/WorkspaceMembers';
import { Workspaces } from '../entities/Workspaces';
import Pool from 'mysql2/typings/mysql/lib/Pool';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get isTest(): boolean {
    return this.nodeEnv === 'test';
  }

  private getNumber(key: string): number {
    const value = this.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(key + ' environment variable is not a number');
    }
  }

  private getBoolean(key: string): boolean {
    const value = this.get(key);

    try {
      return Boolean(JSON.parse(value));
    } catch {
      throw new Error(key + ' env var is not a boolean');
    }
  }

  private getString(key: string): string {
    const value = this.get(key);

    return value.replace(/\\n/g, '\n');
  }

  get nodeEnv(): string {
    return this.getString('NODE_ENV');
  }

  get fallbackLanguage(): string {
    return this.getString('FALLBACK_LANGUAGE');
  }

  get mysqlConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getString('DB_HOST'),
      port: this.getNumber('DB_PORT'),
      username: this.getString('DB_USERNAME'),
      password: this.getString('DB_PASSWORD'),
      database: this.getString('DB_DATABASE'),
      entities: [
        Users,
        Channels,
        ChannelMembers,
        ChannelChats,
        DMs,
        Mentions,
        WorkspaceMembers,
        Workspaces,
      ],
      logging: true,
      keepConnectionAlive: true,
    };
  }

  get awsS3Config() {
    return {
      bucketRegion: this.getString('AWS_S3_BUCKET_REGION'),
      bucketApiVersion: this.getString('AWS_S3_API_VERSION'),
      bucketName: this.getString('AWS_S3_BUCKET_NAME'),
    };
  }

  get documentationEnabled(): boolean {
    return this.getBoolean('ENABLE_DOCUMENTATION');
  }

  get natsEnabled(): boolean {
    return this.getBoolean('NATS_ENABLED');
  }

  get natsConfig() {
    return {
      host: this.getString('NATS_HOST'),
      port: this.getNumber('NATS_PORT'),
    };
  }

  get authConfig() {
    return {
      refreshPrivateKey: this.getString('JWT_REFRESH_PRIVATE_KEY'),
      refreshPublicKey: this.getString('JWT_REFRESH_PUBLIC_KEY'),
      refreshExpirationTime: this.getNumber('JWT_REFRESH_EXPIRATION_TIME'),
      accessSecretKey: this.getString('JWT_ACCESS_SECRET_KEY'),
      accessExpirationTime: this.getNumber('JWT_ACCESS_EXPIRATION_TIME'),
    };
  }

  private get(key: string): string {
    const value = this.configService.get<string>(key);

    if (isNil(value)) {
      throw new Error(key + ' environment variable does not set'); // probably we should call process.exit() too to avoid locking the service
    }

    return value;
  }
}
