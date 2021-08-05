import { EntityRepository, Repository  } from 'typeorm';
import { AndressDeliverySales } from '../models/AndressDeliverySales';

@EntityRepository(AndressDeliverySales)
class AndressDeliverySalesRepository extends Repository<AndressDeliverySales> {}

export { AndressDeliverySalesRepository };
