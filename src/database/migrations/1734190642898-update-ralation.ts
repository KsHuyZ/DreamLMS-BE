import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateRalation1734190642898 implements MigrationInterface {
  name = 'UpdateRalation1734190642898';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_quiz_answer" DROP CONSTRAINT "FK_75f057e6a6e61064434c4d510d7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quiz_answer" DROP CONSTRAINT "UQ_75f057e6a6e61064434c4d510d7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quiz_answer" ADD CONSTRAINT "FK_75f057e6a6e61064434c4d510d7" FOREIGN KEY ("userQuizId") REFERENCES "user_quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_quiz_answer" DROP CONSTRAINT "FK_75f057e6a6e61064434c4d510d7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quiz_answer" ADD CONSTRAINT "UQ_75f057e6a6e61064434c4d510d7" UNIQUE ("userQuizId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quiz_answer" ADD CONSTRAINT "FK_75f057e6a6e61064434c4d510d7" FOREIGN KEY ("userQuizId") REFERENCES "user_quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
