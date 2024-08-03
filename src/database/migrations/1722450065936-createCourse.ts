import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCourse1722450065936 implements MigrationInterface {
  name = 'CreateCourse1722450065936';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f"`,
    );
    await queryRunner.query(
      `CREATE TABLE "courses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "price" integer NOT NULL, "image" character varying NOT NULL, "videoPreview" character varying NOT NULL, "description" character varying NOT NULL, "shortDescription" character varying NOT NULL, "levelId" character varying NOT NULL, "isDeleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT '"2024-07-31T18:21:20.560Z"', "updatedAt" TIMESTAMP NOT NULL DEFAULT '"2024-07-31T18:21:20.561Z"', "deletedAt" TIMESTAMP, "createdById" uuid, CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "related-course" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "courseId" character varying NOT NULL, "relatedCourseId" uuid, CONSTRAINT "PK_757d473bccc36dbeb346ceb42e1" PRIMARY KEY ("id", "courseId"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "REL_75e2be4ce11d447ef43be0e374"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "photoId"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "price"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "image"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "videoPreview"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "description"`);
    await queryRunner.query(
      `ALTER TABLE "courses" DROP COLUMN "shortDescription"`,
    );
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "levelId"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "isDeleted"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "createdById"`);
    await queryRunner.query(
      `ALTER TABLE "courses" ADD "name" character varying(200) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD "price" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD "image" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD "videoPreview" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD "description" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD "shortDescription" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD "levelId" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD "isDeleted" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT '"2024-07-31T18:21:20.560Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT '"2024-07-31T18:21:20.561Z"'`,
    );
    await queryRunner.query(`ALTER TABLE "courses" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "courses" ADD "createdById" uuid`);
    await queryRunner.query(`ALTER TABLE "courses" ADD "userId" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "courses" ADD "courseId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" DROP CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2"`,
    );
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "role" ADD "id" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "role" ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`,
    );
    await queryRunner.query(
      `ALTER TABLE "status" DROP CONSTRAINT "PK_e12743a7086ec826733f54e1d95"`,
    );
    await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "status" ADD "id" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "status" ADD CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "deletedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roleId"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "roleId" uuid`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "statusId"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "statusId" uuid`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3d2f174ef04fb312fdebd0ddc5"`,
    );
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "session" ADD "userId" uuid`);
    await queryRunner.query(
      `CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ddc5" ON "session" ("userId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD CONSTRAINT "FK_3fff66ead8c0964a1805eb194b3" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "related-course" ADD CONSTRAINT "FK_83e034987889e26263d0cca16e3" FOREIGN KEY ("relatedCourseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD CONSTRAINT "FK_8e0ef34f8d606c64586e698abc1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD CONSTRAINT "FK_70d5a4a8bfdf595743eb9f81f82" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "courses" DROP CONSTRAINT "FK_70d5a4a8bfdf595743eb9f81f82"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" DROP CONSTRAINT "FK_8e0ef34f8d606c64586e698abc1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`,
    );
    await queryRunner.query(
      `ALTER TABLE "related-course" DROP CONSTRAINT "FK_83e034987889e26263d0cca16e3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" DROP CONSTRAINT "FK_3fff66ead8c0964a1805eb194b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3d2f174ef04fb312fdebd0ddc5"`,
    );
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "session" ADD "userId" integer`);
    await queryRunner.query(
      `CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ddc5" ON "session" ("userId") `,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "statusId"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "statusId" integer`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roleId"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "roleId" integer`);
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "deletedAt" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "status" DROP CONSTRAINT "PK_e12743a7086ec826733f54e1d95"`,
    );
    await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "status" ADD "id" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "status" ADD CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" DROP CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2"`,
    );
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "role" ADD "id" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "role" ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "courseId"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "createdById"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "isDeleted"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "levelId"`);
    await queryRunner.query(
      `ALTER TABLE "courses" DROP COLUMN "shortDescription"`,
    );
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "videoPreview"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "image"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "price"`);
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "courses" ADD "createdById" uuid`);
    await queryRunner.query(`ALTER TABLE "courses" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "courses" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT '"2024-07-31T18:21:20.561Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT '"2024-07-31T18:21:20.560Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD "isDeleted" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD "levelId" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD "shortDescription" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD "description" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD "videoPreview" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD "image" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD "price" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD "name" character varying(200) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "photoId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "REL_75e2be4ce11d447ef43be0e374" UNIQUE ("photoId")`,
    );
    await queryRunner.query(`DROP TABLE "related-course"`);
    await queryRunner.query(`DROP TABLE "courses"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
