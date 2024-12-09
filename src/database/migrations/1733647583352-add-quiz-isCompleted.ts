import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddQuizIsCompleted1733647583352 implements MigrationInterface {
  name = 'AddQuizIsCompleted1733647583352';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_quiz" ADD "isCompleted" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_quiz" DROP COLUMN "isCompleted"`,
    );
  }
}
