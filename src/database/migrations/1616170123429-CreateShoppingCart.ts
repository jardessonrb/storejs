import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateShoppingCart1616170123429 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "table_shopping_cart",
                columns: [
                    {
                        name: "id_shopping_cart",
                        type: 'uuid',
                        isUnique: true,
                        unsigned: true,
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid'
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        isNullable: false,
                        default: "NOW()"
                    }

                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('table_shopping_cart');
    }

}
