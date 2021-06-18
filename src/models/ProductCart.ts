import { 
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Column,
    Generated,
    Unique,
    ManyToOne,
    JoinColumn,
    OneToOne,
} from 'typeorm';
import { Product } from './Product';
import { ShoppingCart } from './ShoppingCart';


@Entity('table_products_cart')
class ProductCart{

    @PrimaryGeneratedColumn('increment')
    id_product_cart: number;

    
    @ManyToOne(() => ShoppingCart, shoppingCart => shoppingCart.productCart)
    @JoinColumn({name: 'hash_host'})
    hash_host: ShoppingCart;

    
    @Column({name: 'id_user', type: 'varchar'})
    id_user: string;


    @Column({name: 'id_product', type: "uuid"})
    // @OneToOne(() => Product, {
    //     cascade: ['insert', 'remove']
    // })
    @JoinColumn({name: 'id_product'})
    id_product: string
    
    @Column({name: 'created_at', type: 'datetime'})
    @CreateDateColumn()
    created_at: Date;
}


export { ProductCart };
