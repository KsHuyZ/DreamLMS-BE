import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSizeFile1732275089971 implements MigrationInterface {
  name = 'AddSizeFile1732275089971';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "video" ADD "size" integer NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "video" DROP COLUMN "size"`);
  }
}
