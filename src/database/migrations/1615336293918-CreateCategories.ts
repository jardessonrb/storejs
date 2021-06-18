import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCategory1615321558802 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "table_store_categories",
                columns: [
                    {
                        name: "id_category",
                        type: "uuid",
                        generationStrategy: "uuid",
                        isPrimary: true,
                        isUnique: true,
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: "name_category",
                        type: "varchar"
                    },
                    {
                        name: "description_category",
                        type: "varchar"
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
        await queryRunner.dropTable("table_store_categories");

    }

}
