import { EntityRepository, Repository } from 'typeorm';
import { Sales } from '../models/Sales';

@EntityRepository(Sales)
class SalesRepository extends Repository<Sales>{}

export { SalesRepository };
