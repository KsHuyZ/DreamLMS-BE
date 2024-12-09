import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserQuizAnswer1733667841266 implements MigrationInterface {
  name = 'UserQuizAnswer1733667841266';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_quiz_answer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "questionId" uuid, "answerId" uuid, CONSTRAINT "PK_02d71dd680ca8ff98dbda969ec1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quiz_answer" ADD CONSTRAINT "FK_816bb62d457ef00738806823b49" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quiz_answer" ADD CONSTRAINT "FK_12ad435972e27f869b3a8b0024b" FOREIGN KEY ("answerId") REFERENCES "answer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_quiz_answer" DROP CONSTRAINT "FK_12ad435972e27f869b3a8b0024b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quiz_answer" DROP CONSTRAINT "FK_816bb62d457ef00738806823b49"`,
    );
    await queryRunner.query(`DROP TABLE "user_quiz_answer"`);
  }
}
