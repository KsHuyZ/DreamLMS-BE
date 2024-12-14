import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCertificate1734067381937 implements MigrationInterface {
  name = 'AddCertificate1734067381937';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "enrolls" ADD "haveCertificate" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "enrolls" DROP COLUMN "haveCertificate"`,
    );
  }
}
