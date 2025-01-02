import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixRelation1735755366644 implements MigrationInterface {
  name = 'FixRelation1735755366644';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categories_courses_courses" ("categoriesId" uuid NOT NULL, "coursesId" uuid NOT NULL, CONSTRAINT "PK_f22d5b0a10fb9806c638bf988a9" PRIMARY KEY ("categoriesId", "coursesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_410be699ea9b7192892997bb87" ON "categories_courses_courses" ("categoriesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7519ce318c04be742c19d282c3" ON "categories_courses_courses" ("coursesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_courses_courses" ADD CONSTRAINT "FK_410be699ea9b7192892997bb872" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_courses_courses" ADD CONSTRAINT "FK_7519ce318c04be742c19d282c33" FOREIGN KEY ("coursesId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categories_courses_courses" DROP CONSTRAINT "FK_7519ce318c04be742c19d282c33"`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories_courses_courses" DROP CONSTRAINT "FK_410be699ea9b7192892997bb872"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7519ce318c04be742c19d282c3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_410be699ea9b7192892997bb87"`,
    );
    await queryRunner.query(`DROP TABLE "categories_courses_courses"`);
  }
}
