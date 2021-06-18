import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class AndressDeliverySales1615393832960 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "table_andress_delivery_sales",
                columns: [
                    {
                        name: "id_andress_delivery_sales",
                        type: "uuid",
                        generationStrategy: "uuid",
                        isPrimary: true,
                        isUnique: true,
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: "city_delivery_sales",
                        type: "varchar",
                    },
                    {
                        name: "state_delivery_sales",
                        type: "varchar"
                    },
                    {
                        name: "street_delivery_sales",
                        type: "varchar"
                    },
                    {
                        name: "number_house_delivery_sales",
                        type: "integer"
                    },
                    {
                        name: "district_delivery_sales",
                        type: "varchar"
                    },
                    {
                        name: "cep_delivery_sales",
                        type: "uuid"
                    },
                    {
                        name: "apartment_delivery_sales",
                        type: "varchar"
                    },
                    {
                        name: "complement_delivery_sales",
                        type: "varchar"
                    },
                    {
                        name: 'id_sales',
                        type: 'uuid'
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKDelivery",
                        referencedTableName: "table_store_sales",
                        referencedColumnNames: ["id_sales"],
                        columnNames: ["id_sales"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("table_andress_delivery_sales");
    }

}
