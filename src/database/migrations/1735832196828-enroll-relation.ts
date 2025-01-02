import { MigrationInterface, QueryRunner } from 'typeorm';

export class EnrollRelation1735832196828 implements MigrationInterface {
  name = 'EnrollRelation1735832196828';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "enrolls" DROP CONSTRAINT "FK_8a6f3325ea62dfa34bfcede4113"`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrolls" DROP CONSTRAINT "UQ_8a6f3325ea62dfa34bfcede4113"`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrolls" ADD CONSTRAINT "FK_8a6f3325ea62dfa34bfcede4113" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "enrolls" DROP CONSTRAINT "FK_8a6f3325ea62dfa34bfcede4113"`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrolls" ADD CONSTRAINT "UQ_8a6f3325ea62dfa34bfcede4113" UNIQUE ("courseId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrolls" ADD CONSTRAINT "FK_8a6f3325ea62dfa34bfcede4113" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
