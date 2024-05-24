import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePlansTable1622741234567 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'plans',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'plan_title',
            type: 'varchar',
            length: '100',
            isUnique: true,
          },
          {
            name: 'start_time',
            type: 'timestamp',
          },
          {
            name: 'end_time',
            type: 'timestamp',
          },
          {
            name: 'description',
            type: 'varchar',
            length: '256',
          },
          {
            name: 'importance',
            type: 'enum',
            enum: ['high', 'normal', 'low'],
          },
          {
            name: 'completed',
            type: 'boolean',
            default: false,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('plans');
  }
}
