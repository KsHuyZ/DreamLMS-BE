import { MigrationInterface, QueryRunner } from 'typeorm';

export class Databasemigrations1724486277472 implements MigrationInterface {
  name = 'Databasemigrations1724486277472';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "deletedAt" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "createdAt" SET DEFAULT '"2024-08-24T07:58:24.861Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "updatedAt" SET DEFAULT '"2024-08-24T07:58:24.861Z"'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "updatedAt" SET DEFAULT '2024-08-24 06:32:03.088'`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "createdAt" SET DEFAULT '2024-08-24 06:32:03.088'`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "deletedAt" SET DEFAULT now()`,
    );
  }
}
