import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddTime1733598016158 implements MigrationInterface {
  name = 'AddTime1733598016158';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'quiz',
      new TableColumn({
        name: 'time',
        type: 'integer',
        isNullable: true, // Or other type depending on your schema
        default: 900000, // Example default value
      }),
    );
    await queryRunner.query(
      `UPDATE "quiz" SET "time" = 900000 WHERE "time" IS NULL`,
    );
    await queryRunner.changeColumn(
      'quiz',
      'time',
      new TableColumn({
        name: 'time',
        type: 'integer',
        isNullable: false, // Enforce NOT NULL
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "quiz" DROP COLUMN "time"`);
  }
}
