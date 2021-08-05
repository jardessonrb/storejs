import { Entity, Column, PrimaryGeneratedColumn, Generated, CreateDateColumn, ManyToOne, OneToMany, JoinColumn, OneToOne, Check} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Category } from './Category';
import { ImageProduct } from './ImageProduct';
import { ProductCart } from './ProductCart';

@Entity('table_store_products')
@Check(`"amount_stock_product" > -1`)
class Product{

    @PrimaryGeneratedColumn('uuid')
    @Generated('uuid')
    id_product: string;

    @Column({name: 'name_product', type: 'varchar'})
    name_product: string;

    @Column({ type: "float"})
    value_product: number;

    @Column({name: 'description_product', type: 'varchar'})
    description_product: string;

    @Column({name: 'validate_product'})
    @CreateDateColumn()
    validate_product: Date;

    @Column({name: 'amount_stock_product', type: 'int'})
    amount_stock_product: number;

    @Column()
    @CreateDateColumn()
    last_update_product: Date;

    @Column({name: 'emphasis_product', type: 'boolean'})
    emphasis_product: boolean;

    @Column({name: 'id_category', type:'uuid'})
    @ManyToOne(() => Category, category => category.id_category)
    @JoinColumn({name: 'id_category'})
    id_category: Category;


    @OneToMany(() => ImageProduct, imageProduct => imageProduct.product, {
        cascade: ['insert', 'remove']
    })
    @JoinColumn({name: 'id_product'})
    images: ImageProduct[];

    @Column()
    @CreateDateColumn()
    created_at: Date;

}

export { Product };
