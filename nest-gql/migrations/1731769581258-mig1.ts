import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class Mig11731769581258 implements MigrationInterface {
  private readonly logger = new Logger(Mig11731769581258.name);

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('up');
    await queryRunner.query('UPDATE item SET public = true');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
