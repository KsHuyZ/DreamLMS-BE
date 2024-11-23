import { MigrationInterface, QueryRunner } from 'typeorm';

export class VideoTest1732193991457 implements MigrationInterface {
  name = 'VideoTest1732193991457';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "lesson_video" ADD "videoId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "lesson_video" ADD CONSTRAINT "UQ_8c4dfd959ed78b63551b09bcae1" UNIQUE ("videoId")`,
    );
    await queryRunner.query(`ALTER TABLE "lesson_video" DROP COLUMN "isFree"`);
    await queryRunner.query(
      `ALTER TABLE "lesson_video" ADD "isFree" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_video" ADD CONSTRAINT "FK_8c4dfd959ed78b63551b09bcae1" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lesson_video" DROP CONSTRAINT "FK_8c4dfd959ed78b63551b09bcae1"`,
    );
    await queryRunner.query(`ALTER TABLE "lesson_video" DROP COLUMN "isFree"`);
    await queryRunner.query(
      `ALTER TABLE "lesson_video" ADD "isFree" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_video" DROP CONSTRAINT "UQ_8c4dfd959ed78b63551b09bcae1"`,
    );
    await queryRunner.query(`ALTER TABLE "lesson_video" DROP COLUMN "videoId"`);
  }
}
