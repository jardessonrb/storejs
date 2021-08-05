import { EntityRepository, Repository } from 'typeorm';
import { ProductCart } from '../models/ProductCart';

@EntityRepository(ProductCart)
class ProductCartRepository extends Repository<ProductCart> {}

export { ProductCartRepository };
