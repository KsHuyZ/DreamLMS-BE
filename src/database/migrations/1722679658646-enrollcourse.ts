import { MigrationInterface, QueryRunner } from "typeorm";

export class Enrollcourse1722679658646 implements MigrationInterface {
    name = 'Enrollcourse1722679658646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_8e0ef34f8d606c64586e698abc1"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_70d5a4a8bfdf595743eb9f81f82"`);
        await queryRunner.query(`CREATE TABLE "enrolls" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, "courseId" uuid, CONSTRAINT "PK_7a7325dbacb685b7d0e81d38545" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "courseId"`);
        await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "createdAt" SET DEFAULT '"2024-08-03T10:08:05.823Z"'`);
        await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "updatedAt" SET DEFAULT '"2024-08-03T10:08:05.823Z"'`);
        await queryRunner.query(`ALTER TABLE "enrolls" ADD CONSTRAINT "FK_b9da85cd066539a66000037a759" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "enrolls" ADD CONSTRAINT "FK_8a6f3325ea62dfa34bfcede4113" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "enrolls" DROP CONSTRAINT "FK_8a6f3325ea62dfa34bfcede4113"`);
        await queryRunner.query(`ALTER TABLE "enrolls" DROP CONSTRAINT "FK_b9da85cd066539a66000037a759"`);
        await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "updatedAt" SET DEFAULT '2024-07-31 18:21:20.561'`);
        await queryRunner.query(`ALTER TABLE "courses" ALTER COLUMN "createdAt" SET DEFAULT '2024-07-31 18:21:20.56'`);
        await queryRunner.query(`ALTER TABLE "courses" ADD "courseId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "courses" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`DROP TABLE "enrolls"`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_70d5a4a8bfdf595743eb9f81f82" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_8e0ef34f8d606c64586e698abc1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
