import { MigrationInterface, QueryRunner } from 'typeorm';

export class CascadeVideo1733560318917 implements MigrationInterface {
  name = 'CascadeVideo1733560318917';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_video" DROP CONSTRAINT "FK_4680aeb44958b4d5b9e7f6a9b7b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_video" ADD CONSTRAINT "FK_4680aeb44958b4d5b9e7f6a9b7b" FOREIGN KEY ("videoId") REFERENCES "lesson_video"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_video" DROP CONSTRAINT "FK_4680aeb44958b4d5b9e7f6a9b7b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_video" ADD CONSTRAINT "FK_4680aeb44958b4d5b9e7f6a9b7b" FOREIGN KEY ("videoId") REFERENCES "lesson_video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
