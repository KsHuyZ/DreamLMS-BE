import { MigrationInterface, QueryRunner } from 'typeorm';

export class CategoryImage1735721321666 implements MigrationInterface {
  name = 'CategoryImage1735721321666';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "image" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "image"`);
  }
}
