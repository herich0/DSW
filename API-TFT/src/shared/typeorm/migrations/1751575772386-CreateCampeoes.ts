import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCampeoes1751575772386 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'campeoes',
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
                    name: 'custo',
                    type: 'int'
                },
                {
                    name: 'classe',
                    type: 'varchar'
                },
                {
                    name: 'habilidade',
                    type: 'varchar'
                },
                {
                    name: 'vida_base',
                    type: 'int'
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
        await queryRunner.dropTable('campeoes');
    }

}
