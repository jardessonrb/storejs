import { EntityRepository, getConnection, Repository } from 'typeorm';
import { FavoriteCart } from '../models/FavoriteCart';

@EntityRepository(FavoriteCart)
class ListFavoriteCartRepository extends Repository<FavoriteCart> {

    async createFavoriteCart(){
        const result = await this.insert({});
        const { id_favorite_cart } = result.identifiers[0];

        return id_favorite_cart;
    }
}

export { ListFavoriteCartRepository };
