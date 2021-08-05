import { EntityRepository, Repository } from 'typeorm';
import { ProductFavorite } from '../models/ProductFavorite';

@EntityRepository(ProductFavorite)
class ProductFavoriteRepository extends Repository<ProductFavorite> {}

export { ProductFavoriteRepository };
