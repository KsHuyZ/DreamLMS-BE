import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1729413466515 implements MigrationInterface {
  name = 'Migrations1729413466515';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "courseTag" DROP CONSTRAINT "FK_f756125e74e736e5ebbe3f50276"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseTag" DROP CONSTRAINT "FK_22d4bee635c0378358f6aace2dc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseCategory" DROP CONSTRAINT "FK_e96683c40cdb106e4246e6f4b71"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseCategory" DROP CONSTRAINT "FK_21fd46cb306a27934402e054b6a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseTag" DROP CONSTRAINT "PK_e5da0adab22d08b41fc64f4d09d"`,
    );
    await queryRunner.query(`ALTER TABLE "courseTag" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "courseTag" DROP COLUMN "categoryId"`);
    await queryRunner.query(
      `ALTER TABLE "courseCategory" DROP CONSTRAINT "PK_317dbfe62ae3ff6034d13b8574a"`,
    );
    await queryRunner.query(`ALTER TABLE "courseCategory" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "courseCategory" DROP COLUMN "tagId"`);
    await queryRunner.query(
      `ALTER TABLE "courseTag" ADD "tagId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseTag" ADD CONSTRAINT "PK_8c23856780028ee2c41180a5639" PRIMARY KEY ("tagId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseCategory" ADD "categoryId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseCategory" ADD CONSTRAINT "PK_aa002acc00580375ce06536ed3c" PRIMARY KEY ("categoryId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseTag" DROP CONSTRAINT "PK_8c23856780028ee2c41180a5639"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseTag" ADD CONSTRAINT "PK_14b1d2e08d0fa9bfa18dbf105ea" PRIMARY KEY ("courseId", "tagId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseCategory" DROP CONSTRAINT "PK_aa002acc00580375ce06536ed3c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseCategory" ADD CONSTRAINT "PK_86bcf363292e54f79bd6ae32cba" PRIMARY KEY ("courseId", "categoryId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseTag" ALTER COLUMN "courseId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseCategory" ALTER COLUMN "courseId" SET NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_22d4bee635c0378358f6aace2d" ON "courseTag" ("courseId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8c23856780028ee2c41180a563" ON "courseTag" ("tagId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_21fd46cb306a27934402e054b6" ON "courseCategory" ("courseId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_aa002acc00580375ce06536ed3" ON "courseCategory" ("categoryId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "courseTag" ADD CONSTRAINT "FK_22d4bee635c0378358f6aace2dc" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseTag" ADD CONSTRAINT "FK_8c23856780028ee2c41180a5639" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseCategory" ADD CONSTRAINT "FK_21fd46cb306a27934402e054b6a" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseCategory" ADD CONSTRAINT "FK_aa002acc00580375ce06536ed3c" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "courseCategory" DROP CONSTRAINT "FK_aa002acc00580375ce06536ed3c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseCategory" DROP CONSTRAINT "FK_21fd46cb306a27934402e054b6a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseTag" DROP CONSTRAINT "FK_8c23856780028ee2c41180a5639"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseTag" DROP CONSTRAINT "FK_22d4bee635c0378358f6aace2dc"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_aa002acc00580375ce06536ed3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_21fd46cb306a27934402e054b6"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8c23856780028ee2c41180a563"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_22d4bee635c0378358f6aace2d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseCategory" ALTER COLUMN "courseId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseTag" ALTER COLUMN "courseId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseCategory" DROP CONSTRAINT "PK_86bcf363292e54f79bd6ae32cba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseCategory" ADD CONSTRAINT "PK_aa002acc00580375ce06536ed3c" PRIMARY KEY ("categoryId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseTag" DROP CONSTRAINT "PK_14b1d2e08d0fa9bfa18dbf105ea"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseTag" ADD CONSTRAINT "PK_8c23856780028ee2c41180a5639" PRIMARY KEY ("tagId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseCategory" DROP CONSTRAINT "PK_aa002acc00580375ce06536ed3c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseCategory" DROP COLUMN "categoryId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseTag" DROP CONSTRAINT "PK_8c23856780028ee2c41180a5639"`,
    );
    await queryRunner.query(`ALTER TABLE "courseTag" DROP COLUMN "tagId"`);
    await queryRunner.query(`ALTER TABLE "courseCategory" ADD "tagId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "courseCategory" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseCategory" ADD CONSTRAINT "PK_317dbfe62ae3ff6034d13b8574a" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "courseTag" ADD "categoryId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "courseTag" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseTag" ADD CONSTRAINT "PK_e5da0adab22d08b41fc64f4d09d" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseCategory" ADD CONSTRAINT "FK_21fd46cb306a27934402e054b6a" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseCategory" ADD CONSTRAINT "FK_e96683c40cdb106e4246e6f4b71" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseTag" ADD CONSTRAINT "FK_22d4bee635c0378358f6aace2dc" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "courseTag" ADD CONSTRAINT "FK_f756125e74e736e5ebbe3f50276" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
