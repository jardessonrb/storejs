import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateProducts1615321520091 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "table_store_products",
                columns: [
                    {
                        name: "id_product",
                        type: "uuid",
                        generationStrategy: "uuid",
                        isPrimary: true,
                        isUnique: true,
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: "name_product",
                        type: "varchar"
                    },
                    {
                        name: "value_product",
                        type: "float"
                    },
                    {
                        name: "description_product",
                        type: "varchar"
                    },
                    {
                        name: "validate_product",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "amount_stock_product",
                        type: "integer"
                    },
                    {
                        name: "last_update_product",
                        type: "timestamp"
                    },
                    {
                        name: "emphasis_product",
                        type: "boolean"
                    },
                    {
                        name: "id_category",
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
                        name: "FKProduCategorie",
                        referencedTableName: "table_store_categories",
                        referencedColumnNames: ["id_category"],
                        columnNames: ["id_category"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("table_store_products");
    }

}
