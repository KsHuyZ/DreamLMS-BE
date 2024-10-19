import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1729330703072 implements MigrationInterface {
  name = 'Migrations1729330703072';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "videoPreview" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "createdAt" SET DEFAULT '"2024-10-19T09:38:27.775Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "updatedAt" SET DEFAULT '"2024-10-19T09:38:27.776Z"'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "updatedAt" SET DEFAULT '2024-10-17 15:40:47.222'`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "createdAt" SET DEFAULT '2024-10-17 15:40:47.222'`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "videoPreview" SET NOT NULL`,
    );
  }
}
