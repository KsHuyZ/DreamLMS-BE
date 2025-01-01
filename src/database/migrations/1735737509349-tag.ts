import { MigrationInterface, QueryRunner } from 'typeorm';

export class Tag1735737509349 implements MigrationInterface {
  name = 'Tag1735737509349';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tags" ADD "image" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "image"`);
  }
}
