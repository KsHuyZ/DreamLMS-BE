import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddImageEntity1730046821019 implements MigrationInterface {
  name = 'AddImageEntity1730046821019';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "images" ADD "format" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "images" ADD "size" integer NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "size"`);
    await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "format"`);
  }
}
