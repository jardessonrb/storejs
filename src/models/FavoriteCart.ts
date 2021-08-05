import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Generated,
    CreateDateColumn,
    OneToMany,
    JoinColumn
} from 'typeorm';
import { ProductFavorite } from './ProductFavorite';

@Entity('table_favorite_cart')
class FavoriteCart{

    @PrimaryGeneratedColumn("uuid")
    @Generated("uuid")
    id_favorite_cart: string;

    @OneToMany(() => ProductFavorite, productFavorite => productFavorite.hash_host, {
        cascade:['insert', 'remove']
    })
    @JoinColumn({name: 'id_favorite_cart'})
    productFavorite: ProductFavorite[];

    @Column()
    @CreateDateColumn()
    created_at: Date;

}

export { FavoriteCart };
