import { MigrationInterface, QueryRunner } from 'typeorm';

export class CartRelation1734454688186 implements MigrationInterface {
  name = 'CartRelation1734454688186';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cart_item" DROP CONSTRAINT "FK_29e590514f9941296f3a2440d39"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_item" RENAME COLUMN "cartId" TO "courseId"`,
    );
    await queryRunner.query(`ALTER TABLE "cart" ADD "userId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "cart" ADD CONSTRAINT "UQ_756f53ab9466eb52a52619ee019" UNIQUE ("userId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_item" ADD CONSTRAINT "UQ_27b6e41bfb90d1c42c6112cb360" UNIQUE ("courseId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_item" ADD CONSTRAINT "FK_27b6e41bfb90d1c42c6112cb360" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart" ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_item" DROP CONSTRAINT "FK_27b6e41bfb90d1c42c6112cb360"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_item" DROP CONSTRAINT "UQ_27b6e41bfb90d1c42c6112cb360"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart" DROP CONSTRAINT "UQ_756f53ab9466eb52a52619ee019"`,
    );
    await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "userId"`);
    await queryRunner.query(
      `ALTER TABLE "cart_item" RENAME COLUMN "courseId" TO "cartId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_item" ADD CONSTRAINT "FK_29e590514f9941296f3a2440d39" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
