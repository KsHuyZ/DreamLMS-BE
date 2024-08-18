import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1723995924570 implements MigrationInterface {
  name = 'Migrations1723995924570';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "photo" character varying`);
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "createdAt" SET DEFAULT '"2024-08-18T15:45:50.707Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "updatedAt" SET DEFAULT '"2024-08-18T15:45:50.707Z"'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "updatedAt" SET DEFAULT '2024-08-18 15:31:31.22'`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "createdAt" SET DEFAULT '2024-08-18 15:31:31.22'`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "photo"`);
  }
}
