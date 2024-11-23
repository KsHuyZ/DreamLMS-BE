import { MigrationInterface, QueryRunner } from 'typeorm';

export class FloatSize1732276244771 implements MigrationInterface {
  name = 'FloatSize1732276244771';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "video" DROP COLUMN "size"`);
    await queryRunner.query(
      `ALTER TABLE "video" ADD "size" double precision NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "size"`);
    await queryRunner.query(
      `ALTER TABLE "images" ADD "size" double precision NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "size"`);
    await queryRunner.query(`ALTER TABLE "images" ADD "size" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "video" DROP COLUMN "size"`);
    await queryRunner.query(`ALTER TABLE "video" ADD "size" integer NOT NULL`);
  }
}
