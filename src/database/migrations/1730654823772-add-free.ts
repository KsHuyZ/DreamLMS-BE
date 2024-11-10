import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFree1730654823772 implements MigrationInterface {
  name = 'AddFree1730654823772';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "video" ADD "isFree" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "lessons" ALTER COLUMN "disabled" SET DEFAULT true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lessons" ALTER COLUMN "disabled" DROP DEFAULT`,
    );
    await queryRunner.query(`ALTER TABLE "video" DROP COLUMN "isFree"`);
  }
}
