import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateFavoriteCart1616170551399 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        new Table({
            name: "table_favorite_cart",
            columns: [
                {
                    name: "id_favorite_cart",
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('table_favorite_cart')
    }

}
