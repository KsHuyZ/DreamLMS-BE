import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLesson1730571791247 implements MigrationInterface {
  name = 'CreateLesson1730571791247';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "video" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "videoId" character varying NOT NULL, "order" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "lessonId" uuid, CONSTRAINT "PK_1a2f3856250765d72e7e1636c8e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "quiz" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "order" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "lessonId" uuid, CONSTRAINT "PK_422d974e7217414e029b3e641d0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "lessons" DROP COLUMN "isPublic"`);
    await queryRunner.query(
      `ALTER TABLE "lessons" ADD "disabled" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "lessons" ADD "isFree" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "video" ADD CONSTRAINT "FK_47a753668216ecdde9f56811b8b" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quiz" ADD CONSTRAINT "FK_681441d1bf004fc97e473a3bbbb" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "quiz" DROP CONSTRAINT "FK_681441d1bf004fc97e473a3bbbb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "video" DROP CONSTRAINT "FK_47a753668216ecdde9f56811b8b"`,
    );
    await queryRunner.query(`ALTER TABLE "lessons" DROP COLUMN "isFree"`);
    await queryRunner.query(`ALTER TABLE "lessons" DROP COLUMN "disabled"`);
    await queryRunner.query(
      `ALTER TABLE "lessons" ADD "isPublic" boolean NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "quiz"`);
    await queryRunner.query(`DROP TABLE "video"`);
  }
}
