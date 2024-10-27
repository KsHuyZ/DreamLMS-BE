import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1729866039070 implements MigrationInterface {
  name = 'Migrations1729866039070';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "url" character varying NOT NULL, "publicId" character varying NOT NULL, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "image"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "courses" ADD "image" character varying NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "images"`);
  }
}
