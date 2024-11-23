import { MigrationInterface, QueryRunner } from 'typeorm';

export class RelatedCourse1732353200289 implements MigrationInterface {
  name = 'RelatedCourse1732353200289';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "courses_related_courses" ("coursesId_1" uuid NOT NULL, "coursesId_2" uuid NOT NULL, CONSTRAINT "PK_b184474f2172b047e318faa7241" PRIMARY KEY ("coursesId_1", "coursesId_2"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f79e093192324382f24b86243c" ON "courses_related_courses" ("coursesId_1") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bfbaf9cfb7b1b73303b8e00e41" ON "courses_related_courses" ("coursesId_2") `,
    );
    await queryRunner.query(
      `ALTER TABLE "courses_related_courses" ADD CONSTRAINT "FK_f79e093192324382f24b86243c5" FOREIGN KEY ("coursesId_1") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses_related_courses" ADD CONSTRAINT "FK_bfbaf9cfb7b1b73303b8e00e418" FOREIGN KEY ("coursesId_2") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "courses_related_courses" DROP CONSTRAINT "FK_bfbaf9cfb7b1b73303b8e00e418"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses_related_courses" DROP CONSTRAINT "FK_f79e093192324382f24b86243c5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bfbaf9cfb7b1b73303b8e00e41"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f79e093192324382f24b86243c"`,
    );
    await queryRunner.query(`DROP TABLE "courses_related_courses"`);
  }
}
