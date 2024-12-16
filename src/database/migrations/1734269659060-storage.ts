import { MigrationInterface, QueryRunner } from 'typeorm';

export class Storage1734269659060 implements MigrationInterface {
  name = 'Storage1734269659060';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "totalStorage" integer NOT NULL DEFAULT '1'`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "unit" character varying NOT NULL DEFAULT 'gb'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "unit"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "totalStorage"`);
  }
}
