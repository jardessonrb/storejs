import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProductsSales1615337702989 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "table_store_products_sales",
                columns: [
                    {
                        name: "id_product_sales",
                        type: "bigint",
                        isUnique: true,
                        unsigned: true,
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: "id_product",
                        type: "uuid"
                    },
                    {
                        name: "id_sales",
                        type: "uuid"
                    },
                    {
                        name: "value_product_product",
                        type: "float"
                    },
                    {
                        name: "amount_product_product",
                        type: "integer"
                    },
                    {
                        name: "value_total_product",
                        type: "float",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKProductSalesSales",
                        referencedTableName: "table_store_sales",
                        referencedColumnNames: ["id_sales"],
                        columnNames: ["id_sales"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                    {
                        name: "FKProductsSalesProduct",
                        referencedTableName: "table_store_products",
                        referencedColumnNames: ["id_product"],
                        columnNames: ["id_product"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("table_store_products_sales");
    }

}
