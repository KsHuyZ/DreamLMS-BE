import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1723995085866 implements MigrationInterface {
  name = 'Migrations1723995085866';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" RENAME COLUMN "levelId" TO "level"`,
    );
    await queryRunner.query(
      `CREATE TABLE "lessons" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "order" integer NOT NULL, "description" character varying NOT NULL, "isPublic" boolean NOT NULL, "courseId" uuid, CONSTRAINT "PK_9b9a8d455cac672d262d7275730" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roleId"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "statusId"`);
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('ADMIN', 'TEACHER', 'STUDENT')`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "role" "public"."user_role_enum" NOT NULL DEFAULT 'STUDENT'`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'BLOCK')`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "status" "public"."user_status_enum" NOT NULL DEFAULT 'INACTIVE'`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "createdAt" SET DEFAULT '"2024-08-18T15:31:31.220Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "updatedAt" SET DEFAULT '"2024-08-18T15:31:31.220Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "lessons" ADD CONSTRAINT "FK_1a9ff2409a84c76560ae8a92590" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lessons" DROP CONSTRAINT "FK_1a9ff2409a84c76560ae8a92590"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "updatedAt" SET DEFAULT '2024-08-03 10:08:05.823'`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "createdAt" SET DEFAULT '2024-08-03 10:08:05.823'`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "statusId" uuid`);
    await queryRunner.query(`ALTER TABLE "user" ADD "roleId" uuid`);
    await queryRunner.query(`DROP TABLE "lessons"`);
    await queryRunner.query(
      `ALTER TABLE "courses" RENAME COLUMN "level" TO "levelId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
