import { MigrationInterface, QueryRunner } from 'typeorm';

export class CartRelation11734457286871 implements MigrationInterface {
  name = 'CartRelation11734457286871';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cart_item" ADD "cartId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "cart_item" DROP CONSTRAINT "FK_27b6e41bfb90d1c42c6112cb360"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_item" DROP CONSTRAINT "UQ_27b6e41bfb90d1c42c6112cb360"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_item" ADD CONSTRAINT "FK_27b6e41bfb90d1c42c6112cb360" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_item" ADD CONSTRAINT "FK_29e590514f9941296f3a2440d39" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cart_item" DROP CONSTRAINT "FK_29e590514f9941296f3a2440d39"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_item" DROP CONSTRAINT "FK_27b6e41bfb90d1c42c6112cb360"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_item" ADD CONSTRAINT "UQ_27b6e41bfb90d1c42c6112cb360" UNIQUE ("courseId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_item" ADD CONSTRAINT "FK_27b6e41bfb90d1c42c6112cb360" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "cart_item" DROP COLUMN "cartId"`);
  }
}
