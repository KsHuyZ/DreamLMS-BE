import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTimeEnroll1732613786834 implements MigrationInterface {
  name = 'AddTimeEnroll1732613786834';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "enrolls" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "enrolls" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "enrolls" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "enrolls" DROP COLUMN "createdAt"`);
  }
}
