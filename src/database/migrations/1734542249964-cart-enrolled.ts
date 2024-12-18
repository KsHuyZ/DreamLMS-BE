import { MigrationInterface, QueryRunner } from 'typeorm';

export class CartEnrolled1734542249964 implements MigrationInterface {
  name = 'CartEnrolled1734542249964';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cart_item" ADD "isEnrolled" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cart_item" DROP COLUMN "isEnrolled"`);
  }
}
