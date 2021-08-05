import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Generated,
    CreateDateColumn,
    OneToMany,
    JoinColumn
} from 'typeorm';
import { ProductCart } from './ProductCart';

@Entity('table_shopping_cart')
class ShoppingCart{

    @PrimaryGeneratedColumn("uuid")
    @Generated("uuid")
    id_shopping_cart: string;

    @OneToMany(() => ProductCart, productCart => productCart.hash_host, {
        cascade:['insert', 'remove']
    })
    @JoinColumn({name: 'id_shopping_cart'})
    productCart: ProductCart[];

    @Column()
    @CreateDateColumn()
    created_at: Date;

}

export { ShoppingCart };
