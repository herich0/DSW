import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddOrigemIdToCampeoes1751577804052 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('campeoes', new TableColumn({
            name: 'origem_id',
            type: 'uuid',
            isNullable: false
        }));

        await queryRunner.createForeignKey('campeoes', new TableForeignKey({
            columnNames: ['origem_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'origens',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('campeoes');
        const foreignKey = table!.foreignKeys.find(fk => fk.columnNames.includes('origem_id'));

        if (foreignKey) {
            await queryRunner.dropForeignKey('campeoes', foreignKey);
        }

        await queryRunner.dropColumn('campeoes', 'origem_id');
    }

}
