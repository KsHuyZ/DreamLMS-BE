import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCascade1730037563552 implements MigrationInterface {
  name = 'AddCascade1730037563552';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "courses" ADD "imageId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "courses" ADD CONSTRAINT "UQ_4aff0cf92949523f66998843ff3" UNIQUE ("imageId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" ADD CONSTRAINT "FK_4aff0cf92949523f66998843ff3" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "courses" DROP CONSTRAINT "FK_4aff0cf92949523f66998843ff3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "courses" DROP CONSTRAINT "UQ_4aff0cf92949523f66998843ff3"`,
    );
    await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "imageId"`);
  }
}
