import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeletedAt1729962024587 implements MigrationInterface {
  name = 'AddDeletedAt1729962024587';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "isDeleted"`);
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "deletedAt" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "tags" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "tags" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "tags" ADD "deletedAt" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "createdAt"`);
    await queryRunner.query(
      `ALTER TABLE "courses" ADD "isDeleted" boolean NOT NULL DEFAULT false`,
    );
  }
}
