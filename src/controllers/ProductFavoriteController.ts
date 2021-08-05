import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import * as Yup from 'yup';
import { ListFavoriteCartRepository } from '../repositories/ListFavoriteCartRepository';
import { ProductFavoriteRepository } from '../repositories/ProductFavoriteRepository';

class ProductFavoriteController{

    async insertProductFavorite(request: Request, response: Response){
        const { id_hash_host, id_user, id_product } = request.body;
        let hashHostTemporary = id_hash_host;
        if(id_hash_host === ''){
            hashHostTemporary = await getConnection()
                                    .getCustomRepository(ListFavoriteCartRepository)
                                    .createFavoriteCart()
            // console.log("hashHostTemporary: ",hashHostTemporary);
        }

        const hash_host = hashHostTemporary;

        const dataProductFavorite = {hash_host, id_product}

        const schema = Yup.object().shape({
            hash_host: Yup.string().uuid("Identificador da lista de favoritos é inválido").required("Campo do identificador do host obrigatório"),
            id_product: Yup.string().uuid("Identificador do produto inválido").required("Campo do identificador do produto inválido")
        });

        try {
            await schema.validate(dataProductFavorite, {
                abortEarly: false
            });
        } catch (error) {
            return response.status(406).json({errors: [error.errors], status: 'error'});
        }

        const productFavoriteRepository = getConnection().getCustomRepository(ProductFavoriteRepository);

        const productFavorite = productFavoriteRepository.create({
            hash_host,
            id_user,
            id_product
        });

        try {

            const result = await productFavoriteRepository.save(productFavorite);
            return response.status(201).json({result: result, status: 'success', message: 'Produto favoritado'});

        } catch (error) {
            return response.status(500).json({error, status: 'erro interno do servidor'});
        }

    }

    async removeProductFavorite(request: Request, response: Response){
        const { id_product, hash_host } = request.body;

        const schema = Yup.object().shape({
            id_product: Yup.string().uuid("Identificador do produto não corresponde").required("Identificador do produto é obrigatório"),
            hash_host: Yup.string().uuid("Identificador do host não corresponde").required("Identificador do host é obrigatório")
        });

        try {
            await schema.validate(request.body,{
                abortEarly: false
            });

        } catch (error) {
            return response.status(406).json({errors: [error.errors], status: 'error'});
        }

        const productFavoriteRepository = getConnection().getCustomRepository(ProductFavoriteRepository);

        try {

            const result = await productFavoriteRepository.createQueryBuilder().delete().where("id_product = :id and hash_host = :hash", { id: id_product, hash: hash_host}).execute();

            return response.status(200).json({result: result, status: 'sucess', message: 'Produto removido com sucesso'});

        } catch (error) {

            return response.status(500).json({errors: [error.errors], status: 'error', message: 'Erro interno do servidor'});
        }
    }

    async getAllProductFavorite(request: Request, response: Response){

        const { hash_host } = request.params;

        const schema = Yup.object().shape({
            hash_host: Yup.string().uuid("Identificador do host não corresponde").required("Identificador do host é obrigatório")
        });

        try {
            await schema.validate({hash_host}, {
                abortEarly: false
            });

        } catch (error) {
            return response.status(406).json({errors: [error.errors], status: 'error'});
        }

        const productFavoriteRepository = getConnection().getCustomRepository(ProductFavoriteRepository);

        try {

            const result = await productFavoriteRepository.query(`select * from table_store_products
            inner join table_products_favorite
            on table_store_products.id_product = table_products_favorite.id_product
            where table_products_favorite.hash_host = '${hash_host}'`);

            return response.status(200).json({result: result, status: 'sucess', message: 'getall'});

        } catch (error) {

            return response.status(500).json({errors: [error.errors], status: 'error', message: 'Erro interno do servidor'});
        }
    }

}

export { ProductFavoriteController };
