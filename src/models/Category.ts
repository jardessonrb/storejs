import { Column, CreateDateColumn, Entity, Generated, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../models/Product';

@Entity('table_store_categories')
class Category{

    @PrimaryGeneratedColumn("uuid")
    @Generated("uuid")
    id_category: string;

    @Column()
    name_category: string;

    @Column()
    description_category: string;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Product, product => product.id_category)
    @JoinColumn({name: 'id_category'})
    products: Product;
}


export { Category };