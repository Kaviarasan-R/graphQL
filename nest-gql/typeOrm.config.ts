import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Comment } from './src/rest/items/entities/comment.entity';
import { Item } from './src/rest/items/entities/item.entity';
import { Listing } from './src/rest/items/entities/listing.entity';
import { Tag } from './src/rest/items/entities/tag.entity';
import { DataSource } from 'typeorm';

config();

const configService = new ConfigService();

export default new DataSource({
  // type: 'mysql',
  // host: configService.getOrThrow('MYSQL_HOST'),
  // port: configService.getOrThrow('MYSQL_PORT'),
  // database: configService.getOrThrow('MYSQL_DATABASE'),
  // username: configService.getOrThrow('MYSQL_USERNAME'),
  // password: configService.getOrThrow('MYSQL_PASSWORD'),
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'typeorm',
  migrations: ['migrations/**'],
  entities: [Item, Listing, Comment, Tag],
});
