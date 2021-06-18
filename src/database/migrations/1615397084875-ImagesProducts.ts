import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class ImagesProducts1615397084875 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "table_images_products",
                columns: [
                    {
                        name: 'id_image',
                        type: 'integer',
                        unsigned: true,
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: "path_image",
                        type: "varchar"
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
                        name: 'FKImageProduct',
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
    }

}
