import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1724481114720 implements MigrationInterface {
  name = 'Migrations1724481114720';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "courses" DROP CONSTRAINT "FK_3fff66ead8c0964a1805eb194b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrolls" DROP CONSTRAINT "FK_b9da85cd066539a66000037a759"`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('ADMIN', 'TEACHER', 'STUDENT')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'BLOCK')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying, "password" character varying, "provider" character varying NOT NULL DEFAULT 'email', "socialId" character varying, "firstName" character varying, "lastName" character varying, "photo" character varying, "role" "public"."users_role_enum" NOT NULL DEFAULT 'STUDENT', "status" "public"."users_status_enum" NOT NULL DEFAULT 'INACTIVE', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2025eaefc4e1b443c84f6ca9b2" ON "users" ("socialId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5372672fbfd1677205e0ce3ece" ON "users" ("firstName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_af99afb7cf88ce20aff6977e68" ON "users" ("lastName") `,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "createdAt" SET DEFAULT '"2024-08-24T06:32:03.088Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "updatedAt" SET DEFAULT '"2024-08-24T06:32:03.088Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD CONSTRAINT "FK_3fff66ead8c0964a1805eb194b3" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrolls" ADD CONSTRAINT "FK_b9da85cd066539a66000037a759" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrolls" DROP CONSTRAINT "FK_b9da85cd066539a66000037a759"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" DROP CONSTRAINT "FK_3fff66ead8c0964a1805eb194b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "updatedAt" SET DEFAULT '2024-08-18 15:45:50.707'`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "createdAt" SET DEFAULT '2024-08-18 15:45:50.707'`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_af99afb7cf88ce20aff6977e68"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5372672fbfd1677205e0ce3ece"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2025eaefc4e1b443c84f6ca9b2"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrolls" ADD CONSTRAINT "FK_b9da85cd066539a66000037a759" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD CONSTRAINT "FK_3fff66ead8c0964a1805eb194b3" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
