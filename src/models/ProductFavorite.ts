import {
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
    CreateDateColumn,
    JoinColumn,
    Column,
    OneToOne,
    ManyToOne
} from 'typeorm';
import { FavoriteCart } from './FavoriteCart';
import { Product } from './Product';

@Entity('table_products_favorite')
class ProductFavorite{

    @PrimaryGeneratedColumn('increment')
    id_product_favorite: number;

    @ManyToOne(() => FavoriteCart, favoriteCart => favoriteCart.productFavorite)
    @JoinColumn({name: 'hash_host'})
    hash_host: FavoriteCart;

    @Column({name: 'id_user', type: 'varchar'})
    id_user: string;

    @Column({name: 'id_product', type: "uuid"})

    @JoinColumn({name: 'id_product'})
    id_product: string

    @Column({name: 'created_at', type: 'datetime'})
    @CreateDateColumn()
    created_at: Date;
}

export { ProductFavorite };
