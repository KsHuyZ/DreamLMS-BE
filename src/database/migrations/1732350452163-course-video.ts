import { MigrationInterface, QueryRunner } from 'typeorm';

export class CourseVideo1732350452163 implements MigrationInterface {
  name = 'CourseVideo1732350452163';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "course_video" DROP CONSTRAINT "FK_39454cf229f5bbede1d4181c3f4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" RENAME COLUMN "videoPreview" TO "courseVideoId"`,
    );
    await queryRunner.query(`ALTER TABLE "course_video" DROP COLUMN "order"`);
    await queryRunner.query(
      `ALTER TABLE "course_video" DROP COLUMN "lessonId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_video" DROP CONSTRAINT "FK_44ef389a626b13ba04ffb806c36"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_video" ADD CONSTRAINT "UQ_44ef389a626b13ba04ffb806c36" UNIQUE ("videoId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" DROP COLUMN "courseVideoId"`,
    );
    await queryRunner.query(`ALTER TABLE "courses" ADD "courseVideoId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "courses" ADD CONSTRAINT "UQ_34b222afb580d71e0ab116e99ef" UNIQUE ("courseVideoId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_video" ADD CONSTRAINT "FK_44ef389a626b13ba04ffb806c36" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD CONSTRAINT "FK_34b222afb580d71e0ab116e99ef" FOREIGN KEY ("courseVideoId") REFERENCES "course_video"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "courses" DROP CONSTRAINT "FK_34b222afb580d71e0ab116e99ef"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_video" DROP CONSTRAINT "FK_44ef389a626b13ba04ffb806c36"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" DROP CONSTRAINT "UQ_34b222afb580d71e0ab116e99ef"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" DROP COLUMN "courseVideoId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD "courseVideoId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_video" DROP CONSTRAINT "UQ_44ef389a626b13ba04ffb806c36"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_video" ADD CONSTRAINT "FK_44ef389a626b13ba04ffb806c36" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "course_video" ADD "lessonId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "course_video" ADD "order" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" RENAME COLUMN "courseVideoId" TO "videoPreview"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_video" ADD CONSTRAINT "FK_39454cf229f5bbede1d4181c3f4" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
