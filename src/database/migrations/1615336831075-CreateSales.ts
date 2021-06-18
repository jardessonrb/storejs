import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSales1615336831075 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "table_store_sales",
                columns: [
                    {
                        name: "id_sales",
                        type: "uuid",
                        generationStrategy: "uuid",
                        isPrimary: true,
                        isUnique: true,
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: "value_total_sales",
                        type: "float"
                    },
                    {
                        name: "status_sales",
                        type: "varchar"
                    },
                    {
                        name: "name_client_sales",
                        type: "varchar"
                    },
                    {
                        name: "cpf_client_sales",
                        type: "varchar"
                    },
                    {
                        name: "id_user_sales",
                        type: "uuid"
                    },
                    {
                        name: "date_of_sales",
                        type: "timestamp",
                        default: "now()"
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
                        name: "FKSalesUsers",
                        referencedTableName: "table_store_users",
                        referencedColumnNames: ["id_user"],
                        columnNames: ["id_user_sales"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("table_store_sales");
    }

}
