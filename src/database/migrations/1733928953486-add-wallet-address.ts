import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddWalletAddress1733928953486 implements MigrationInterface {
  name = 'AddWalletAddress1733928953486';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "walletAddress" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "walletAddress"`);
  }
}
