import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    Generated, 
    CreateDateColumn, 
    ManyToOne, 
    OneToMany, 
    JoinColumn, 
    OneToOne
} from 'typeorm';

import { Sales } from './Sales';



@Entity('table_store_products_sales')
class ProductSale{
    @PrimaryGeneratedColumn('increment')
    id_product_sales: number;

    @Column({name: 'id_product', type: "uuid"})
    id_product: string;

    @Column({name: 'id_sales', type: "uuid"})
    @ManyToOne(() => Sales, sales => sales.productSale)
    @JoinColumn({name: 'id_sales'})
    sales: Sales;

    @Column({name: 'name_product', type: 'varchar'})
    name_product: string;

    @Column({name: 'value_product', type: 'float8'})
    value_product: number;

    @Column({name: 'quantity_product', type: 'int4'})
    quantity_product: number;

    @Column({name: 'value_total_product', type: 'float8'})
    value_total_product: number;

    @Column()
    @CreateDateColumn()
    created_at: Date;

}


export { ProductSale };
