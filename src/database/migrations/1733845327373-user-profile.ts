import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserProfile1733845327373 implements MigrationInterface {
  name = 'UserProfile1733845327373';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "facebook" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "instagram" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "github" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "x" character varying`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "description" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "banner" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "banner"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "x"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "github"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "instagram"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "facebook"`);
  }
}
