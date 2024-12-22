import { MigrationInterface, QueryRunner } from 'typeorm';

export class Rate1734767862430 implements MigrationInterface {
  name = 'Rate1734767862430';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "rate" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "star" integer NOT NULL, "comment" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "courseId" uuid, CONSTRAINT "PK_2618d0d38af322d152ccc328f33" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "rate" ADD CONSTRAINT "FK_7440b44c5acbec8b2ebfc3af7d2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "rate" ADD CONSTRAINT "FK_6fb5105afda03b7383c0663ca0d" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rate" DROP CONSTRAINT "FK_6fb5105afda03b7383c0663ca0d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rate" DROP CONSTRAINT "FK_7440b44c5acbec8b2ebfc3af7d2"`,
    );
    await queryRunner.query(`DROP TABLE "rate"`);
  }
}
