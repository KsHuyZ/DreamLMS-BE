import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1729442264722 implements MigrationInterface {
  name = 'Migrations1729442264722';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "courses" ADD "status" character varying NOT NULL DEFAULT 'DRAFT'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "status"`);
  }
}
