import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1729396488050 implements MigrationInterface {
  name = 'Migrations1729396488050';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "courses" DROP CONSTRAINT "FK_3fff66ead8c0964a1805eb194b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "createdAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "updatedAt" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "createdById" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD CONSTRAINT "FK_3fff66ead8c0964a1805eb194b3" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "courses" DROP CONSTRAINT "FK_3fff66ead8c0964a1805eb194b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "createdById" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "updatedAt" SET DEFAULT '2024-10-19 09:38:27.776'`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ALTER COLUMN "createdAt" SET DEFAULT '2024-10-19 09:38:27.775'`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD CONSTRAINT "FK_3fff66ead8c0964a1805eb194b3" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
