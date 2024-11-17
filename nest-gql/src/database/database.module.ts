import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'root',
          database: 'typeorm',
          // url: 'postgresql://postgres:root@localhost/typeorm',
          synchronize: true, // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
          retryAttempts: 3,
          retryDelay: 5000,
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
