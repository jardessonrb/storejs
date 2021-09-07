import { EntityRepository, ILike, Repository } from 'typeorm';
import { Product } from '../models/Product';

interface ProductsUpdate{
    id_product: string;
    name_product: string;
    value_product: number;
    quantity_product: number;
    value_total_product: number;
}

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {
    async getAllProductsOrderEmphasisRepository(){

        try {
            const result = this.find({where: {emphasis_product: true}, take: 20, skip: 0, order: {created_at: 'DESC'}})

            return result;
        } catch (error) {
            throw new error;
        }
    }
    async getProductsForPageRepository(page: number){
        const numberOfProducts = 3;
        const offSet = (page - 1) * numberOfProducts;
        const numberOfProductsLimit = numberOfProducts * page;

        try {
            const result = await this.find({take: numberOfProductsLimit, skip: offSet, order: {created_at: 'DESC'}})

            return result;
        } catch (error) {
            console.log("Error na getAll ... :", error);
        }
    }
    async getProductByLikeNameRepository(nameProduct: string){

        try {
            const result = await this.find({name_product: ILike(`%${nameProduct}%`)})

            return result;
        } catch (error) {
            console.log("Error na getAll ... :", error);
        }
    }
    async getProductBySpecificNameRepository(nameProduct: string){

        try {
            const result = await this.find({where: {name_product: nameProduct}, take: 1});
            return result;
        } catch (error) {
            console.log("Error na getAll ... :", error);
        }
    }

    async decrementQuantityStockProduct(productSale: ProductsUpdate[]){

        try {
            const result =  productSale.map(async (product: ProductsUpdate) => {
                const [ Product ]  = await this.find({select: ['amount_stock_product'], where: {id_product: product.id_product}})
                const differenceQuantity = Product.amount_stock_product - product.quantity_product;
                if(differenceQuantity >= 0){
                    return await this.update(product.id_product, {amount_stock_product: differenceQuantity});
                }
                // return this.query(`UPDATE table_store_products SET amount_stock_product =
                // ((select amount_stock_product from table_store_products where id_product = ${product.id_product}) - ${product.quantity_product})
                // WHERE id_product = ${product.id_product} AND ((select amount_stock_product from table_store_products where id_product = ${product.id_product}) - ${product.quantity_product}) >= 0`);
                // return await this.update(product.id_product, {amount_stock_product: -10});
            })

        } catch (error) {

        }
    }
}

export { ProductRepository };
