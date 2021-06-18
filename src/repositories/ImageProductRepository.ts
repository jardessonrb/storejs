import { EntityRepository, Repository } from 'typeorm';
import { ImageProduct } from '../models/ImageProduct';

@EntityRepository(ImageProduct)

class ImageProductRepository extends Repository<ImageProduct> {}

export { ImageProductRepository };