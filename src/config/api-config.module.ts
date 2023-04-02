import { Global, Module } from '@nestjs/common';
import { ApiConfigService } from './api-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ApiConfigModule],
      inject: [ApiConfigService],
      useFactory: (apiconfigService: ApiConfigService) =>
        apiconfigService.mysqlConfig,
    }),
  ],
  providers: [ApiConfigService],
  exports: [ApiConfigService],
})
@Global()
export class ApiConfigModule {}
