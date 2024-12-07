import { MigrationInterface, QueryRunner } from 'typeorm';

export class CourseProgress1733477709798 implements MigrationInterface {
  name = 'CourseProgress1733477709798';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_video" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "videoId" uuid, CONSTRAINT "PK_24c7490a61628f17ddaae1736cd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_quiz" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "score" numeric(5,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "quizId" uuid, CONSTRAINT "PK_9fdb0b0acc452e256cbfb7f9040" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_video" ADD CONSTRAINT "FK_45168e8fb0a2f45871a5a8ec04e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_video" ADD CONSTRAINT "FK_4680aeb44958b4d5b9e7f6a9b7b" FOREIGN KEY ("videoId") REFERENCES "lesson_video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quiz" ADD CONSTRAINT "FK_ac373cc6866e0323192c662cae9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quiz" ADD CONSTRAINT "FK_3a6c5188a5d0fdc3c55f087cdcc" FOREIGN KEY ("quizId") REFERENCES "quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_quiz" DROP CONSTRAINT "FK_3a6c5188a5d0fdc3c55f087cdcc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_quiz" DROP CONSTRAINT "FK_ac373cc6866e0323192c662cae9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_video" DROP CONSTRAINT "FK_4680aeb44958b4d5b9e7f6a9b7b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_video" DROP CONSTRAINT "FK_45168e8fb0a2f45871a5a8ec04e"`,
    );
    await queryRunner.query(`DROP TABLE "user_quiz"`);
    await queryRunner.query(`DROP TABLE "user_video"`);
  }
}
