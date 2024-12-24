import { MigrationInterface, QueryRunner } from 'typeorm';

export class EthPrice1734877976680 implements MigrationInterface {
  name = 'EthPrice1734877976680';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "courses" ADD "ethPrice" numeric`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "ethPrice"`);
  }
}
