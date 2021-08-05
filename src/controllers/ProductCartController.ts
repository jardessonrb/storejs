import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { ProductCartRepository } from '../repositories/ProductCartRepository';
import * as Yup  from 'yup';
import { ShoppingCartRepository } from '../repositories/ShoppingCartRepository';

class ProductCartController{
    async insertProductCart(request: Request, response: Response){
        const {id_hash_host, id_user, id_product} = request.body;
        let temporaryHashHost = id_hash_host;
        if(id_hash_host === ''){
            temporaryHashHost = await getConnection()
                                .getCustomRepository(ShoppingCartRepository)
                                .createShoppingCart();
        }

        const hash_host = temporaryHashHost;

        const dataProductCart = {hash_host, id_user, id_product};

        const schema = Yup.object().shape({
            hash_host: Yup.string().uuid("Identificador do carrinho inválido").required("Campo do identificador do host obrigatório"),
            id_product: Yup.string().uuid("Identificador do produto inválido").required("Campo do identificador do produto inválido")
        });

        try {
            await schema.validate(dataProductCart, {
                abortEarly: false
            });
        } catch (error) {
            return response.status(406).json({errors: error.errors, status: 'error'});
        }

        const productCartRepository = getConnection().getCustomRepository(ProductCartRepository);

        const productCart = productCartRepository.create({
            hash_host,
            id_user,
            id_product
        });

        try {
            const result = await productCartRepository.save(productCart);
            return response.status(201).json({result, status: 'success'});

        } catch (error) {

            return response.status(500).json({error, status: 'erro interno do servidor'});

        }
    }

    async removeProductCart(request: Request, response: Response){
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

        const productCartRepository = getConnection().getCustomRepository(ProductCartRepository);

        try {

            const result = await productCartRepository.createQueryBuilder().delete().where("id_product = :id and hash_host = :hash", { id: id_product, hash: hash_host}).execute();

            return response.status(200).json({result: result, status: 'sucess', message: `Produto deletado com sucesso`});

        } catch (error) {

            return response.status(500).json({errors: [error.errors], status: 'error', message: 'Erro interno do servidor'});
        }

    }

    async getAllProductsCart(request: Request, response: Response){
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
        const productCartRepository = getConnection().getCustomRepository(ProductCartRepository);

        try {

            const result = await productCartRepository.query(`select * from table_store_products
            inner join table_products_cart
            on table_store_products.id_product = table_products_cart.id_product
            where table_products_cart.hash_host = '${hash_host}'`);

            return response.status(200).json({result: result, status: 'sucess', message: `opa ..`});

        } catch (error) {

            return response.status(500).json({errors: [error.errors], status: 'error', message: 'Erro interno do servidor'});
        }

    }

}

export { ProductCartController };
