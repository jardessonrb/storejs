import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class ListShoppingCarts1615398994499 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "table_products_cart",
                columns: [
                    {
                        name: "id_product_cart",
                        type: "bigint",
                        isUnique: true,
                        unsigned: true,
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: "hash_host",
                        type: "uuid"
                    },
                    {
                        name: "id_user",
                        type: "uuid"
                    },
                    {
                        name: "id_product",
                        type: "uuid"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        isNullable: false,
                        default: "NOW()"
                    }

                ],

                foreignKeys: [
                    {
                        name: 'FKListCartProduct',
                        columnNames: ['id_product'],
                        referencedTableName: 'table_store_products',
                        referencedColumnNames: ['id_product'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("table_products_cart");
    }

}
