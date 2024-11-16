import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveDescriptionQuestion1731765447429
  implements MigrationInterface
{
  name = 'RemoveDescriptionQuestion1731765447429';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "description"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "question" ADD "description" character varying NOT NULL`,
    );
  }
}
