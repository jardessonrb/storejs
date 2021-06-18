import { EntityRepository, getConnection, Repository } from 'typeorm';
import { ShoppingCart } from '../models/ShoppingCart';

@EntityRepository(ShoppingCart)
class ShoppingCartRepository extends Repository<ShoppingCart> {

    async createShoppingCart(){
        const result = await this.insert({});

        const { id_shopping_cart } = result.identifiers[0];

        return id_shopping_cart;
    }
}


export { ShoppingCartRepository };