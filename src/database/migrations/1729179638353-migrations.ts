import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1729179638353 implements MigrationInterface {
  name = 'Migrations1729179638353';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "courseCategory" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tagId" uuid, "courseId" uuid, CONSTRAINT "PK_317dbfe62ae3ff6034d13b8574a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "courseTag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "categoryId" uuid, "courseId" uuid, CONSTRAINT "PK_e5da0adab22d08b41fc64f4d09d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "createdAt" SET DEFAULT '"2024-10-17T15:40:47.222Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "updatedAt" SET DEFAULT '"2024-10-17T15:40:47.222Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseCategory" ADD CONSTRAINT "FK_e96683c40cdb106e4246e6f4b71" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseCategory" ADD CONSTRAINT "FK_21fd46cb306a27934402e054b6a" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseTag" ADD CONSTRAINT "FK_f756125e74e736e5ebbe3f50276" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseTag" ADD CONSTRAINT "FK_22d4bee635c0378358f6aace2dc" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "courseTag" DROP CONSTRAINT "FK_22d4bee635c0378358f6aace2dc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseTag" DROP CONSTRAINT "FK_f756125e74e736e5ebbe3f50276"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseCategory" DROP CONSTRAINT "FK_21fd46cb306a27934402e054b6a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseCategory" DROP CONSTRAINT "FK_e96683c40cdb106e4246e6f4b71"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "updatedAt" SET DEFAULT '2024-10-09 13:55:13.121'`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "createdAt" SET DEFAULT '2024-10-09 13:55:13.121'`,
    );
    await queryRunner.query(`DROP TABLE "courseTag"`);
    await queryRunner.query(`DROP TABLE "courseCategory"`);
  }
}
