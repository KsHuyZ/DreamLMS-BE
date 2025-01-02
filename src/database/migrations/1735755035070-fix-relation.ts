import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixRelation1735755035070 implements MigrationInterface {
  name = 'FixRelation1735755035070';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "courses_categories_categories" ("coursesId" uuid NOT NULL, "categoriesId" uuid NOT NULL, CONSTRAINT "PK_2ecaa4a41f72c350df7d0330f65" PRIMARY KEY ("coursesId", "categoriesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d7ed0fa785db34184bb5e91c7e" ON "courses_categories_categories" ("coursesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_532ec69edb2ba7768e076bc67d" ON "courses_categories_categories" ("categoriesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "courses_categories_categories" ADD CONSTRAINT "FK_d7ed0fa785db34184bb5e91c7e0" FOREIGN KEY ("coursesId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses_categories_categories" ADD CONSTRAINT "FK_532ec69edb2ba7768e076bc67d9" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "courses_categories_categories" DROP CONSTRAINT "FK_532ec69edb2ba7768e076bc67d9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses_categories_categories" DROP CONSTRAINT "FK_d7ed0fa785db34184bb5e91c7e0"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_532ec69edb2ba7768e076bc67d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d7ed0fa785db34184bb5e91c7e"`,
    );
    await queryRunner.query(`DROP TABLE "courses_categories_categories"`);
  }
}
