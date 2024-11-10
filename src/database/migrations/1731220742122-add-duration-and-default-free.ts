import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDurationAndDefaultFree1731220742122
  implements MigrationInterface
{
  name = 'AddDurationAndDefaultFree1731220742122';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "video" ADD "duration" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "video" ALTER COLUMN "isFree" SET DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "video" ALTER COLUMN "isFree" DROP DEFAULT`,
    );
    await queryRunner.query(`ALTER TABLE "video" DROP COLUMN "duration"`);
  }
}
