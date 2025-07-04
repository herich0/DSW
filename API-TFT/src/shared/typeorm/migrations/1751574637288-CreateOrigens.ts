import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateOrigens1751574637288 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'origens',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'nome',
                    type: 'varchar'
                },
                {
                    name: 'descricao',
                    type: 'text'
                },
                {
                    name: 'tipo_bonus',
                    type: 'varchar'
                },
                {
                    name: 'campeoes_necessarios',
                    type: 'varchar'  // formato como "3/5/7/10"
                },
                {
                    name: 'beneficio_ativo',
                    type: 'text'
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }));
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('origens');
    }
}
