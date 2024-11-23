import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLessonVideo1732122535595 implements MigrationInterface {
  name = 'AddLessonVideo1732122535595';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "video" DROP CONSTRAINT "FK_47a753668216ecdde9f56811b8b"`,
    );
    await queryRunner.query(
      `CREATE TABLE "lesson_video" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "order" integer NOT NULL, "isFree" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "lessonId" uuid, CONSTRAINT "PK_ddfb00dc35a3c857190a78797a1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "course_video" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "order" integer NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "lessonId" uuid, "videoId" uuid, CONSTRAINT "PK_01bf48188bdc66897dbaacb5e66" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "video" DROP COLUMN "order"`);
    await queryRunner.query(`ALTER TABLE "video" DROP COLUMN "lessonId"`);
    await queryRunner.query(`ALTER TABLE "video" DROP COLUMN "isFree"`);
    await queryRunner.query(`ALTER TABLE "lessons" DROP COLUMN "isFree"`);
    await queryRunner.query(`ALTER TABLE "video" ADD "createdById" uuid`);
    await queryRunner.query(`ALTER TABLE "images" ADD "createdById" uuid`);
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "status" SET DEFAULT 'draft'`,
    );
    await queryRunner.query(
      `ALTER TABLE "video" ADD CONSTRAINT "FK_13d000ea83a238758ffc62f2c94" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_video" ADD CONSTRAINT "FK_ab7797b24495f7baea03e33cbec" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "images" ADD CONSTRAINT "FK_e05c1ea20bfd629bd6c7639e934" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_video" ADD CONSTRAINT "FK_39454cf229f5bbede1d4181c3f4" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_video" ADD CONSTRAINT "FK_44ef389a626b13ba04ffb806c36" FOREIGN KEY ("videoId") REFERENCES "video"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "course_video" DROP CONSTRAINT "FK_44ef389a626b13ba04ffb806c36"`,
    );
    await queryRunner.query(
      `ALTER TABLE "course_video" DROP CONSTRAINT "FK_39454cf229f5bbede1d4181c3f4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "images" DROP CONSTRAINT "FK_e05c1ea20bfd629bd6c7639e934"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lesson_video" DROP CONSTRAINT "FK_ab7797b24495f7baea03e33cbec"`,
    );
    await queryRunner.query(
      `ALTER TABLE "video" DROP CONSTRAINT "FK_13d000ea83a238758ffc62f2c94"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "status" SET DEFAULT 'DRAFT'`,
    );
    await queryRunner.query(`ALTER TABLE "images" DROP COLUMN "createdById"`);
    await queryRunner.query(`ALTER TABLE "video" DROP COLUMN "createdById"`);
    await queryRunner.query(
      `ALTER TABLE "lessons" ADD "isFree" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "video" ADD "isFree" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(`ALTER TABLE "video" ADD "lessonId" uuid`);
    await queryRunner.query(`ALTER TABLE "video" ADD "order" integer NOT NULL`);
    await queryRunner.query(`DROP TABLE "course_video"`);
    await queryRunner.query(`DROP TABLE "lesson_video"`);
    await queryRunner.query(
      `ALTER TABLE "video" ADD CONSTRAINT "FK_47a753668216ecdde9f56811b8b" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
