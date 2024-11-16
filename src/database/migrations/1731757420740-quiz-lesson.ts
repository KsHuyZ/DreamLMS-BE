import { MigrationInterface, QueryRunner } from 'typeorm';

export class QuizLesson1731757420740 implements MigrationInterface {
  name = 'QuizLesson1731757420740';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "answer" ADD "questionId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "question" ADD "type" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "answer" ADD CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "answer" DROP CONSTRAINT "FK_a4013f10cd6924793fbd5f0d637"`,
    );
    await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "type"`);
    await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "questionId"`);
  }
}
