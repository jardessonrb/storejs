import { getCustomRepository, getConnection } from 'typeorm';
import { Request, Response } from 'express';
import { ProductRepository } from '../repositories/ProductRepository';
import * as Yup from 'yup';
import '../utils/setLocaleYup';
import { ProductController } from './ProductController';


class ProductAdminController extends ProductController {

    async createProduct(request: Request, response: Response){
        const {
            name_product,
            value_product,
            description_product,
            amount_stock_product,
            validate_product,
            emphasis_product,
            id_category
        } = request.body;

        const imagesProduct = request.files as Express.Multer.File[];
        if(imagesProduct.length > 5 || imagesProduct.length < 1){
            return response.status(400).json({message: "Numero de images invalidos"});
        }

        const images = imagesProduct.map(image => {
            return {path_image: image.filename}
        });

        const dataProduct = {
            name_product,
            value_product,
            description_product,
            amount_stock_product,
            validate_product,
            last_update_product: (new Date(Date.now())),
            emphasis_product,
            id_category,
            images
        }

        const schema = Yup.object().shape({
            name_product: Yup.string().required("Nome do produto é obrigatório"),
            value_product: Yup.number().positive("O Valor do produto não pode ser negativo").required("Valor do produto é obrigatório"),
            description_product: Yup.string().required("A descrição do produto é obrigatório"),
            amount_stock_product: Yup.number().positive().integer().required("A quantidade do produto é obrigatório"),
            validate_product: Yup.date().required("A data de vencimento do produto é obrigatório"),
            emphasis_product: Yup.boolean().label("Destaque é obrigatório"),
            id_category: Yup.string().uuid("Identificador não válido da categoria").required("O indetificador da categoria é obrigatório"),
            images: Yup.array(Yup.object().shape({
                path_image: Yup.string().required("Nome da imagem não válido")
            }))
        });

        try {
            await schema.validate(dataProduct, {
                abortEarly: false
            });

        } catch (error) {

            return response.status(406).json({errors: [error.errors], status: 'error'});
        }

        const productRepository = getConnection().getCustomRepository(ProductRepository);

        const product = productRepository.create(dataProduct);
        try {
            const {id_product, name_product: string} = await productRepository.save(product);
            return response.status(201).json({id_product, name_product, status: 'sucess', message: `Produto ${name_product} cadastrado com sucesso`});

        } catch (error) {
            return response.status(500).json({status: 'error', message: `Erro interno do servidor ...`});
        }

    }

    async updateProduct(request: Request, response: Response){
        let {
            id_product,
            name_product,
            value_product,
            description_product,
            amount_stock_product,
            validate_product,
            last_update_product,
            emphasis_product,
            id_category
        } = request.body;


        let dataProduct = {
            id_product,
            name_product,
            value_product,
            description_product,
            amount_stock_product,
            validate_product,
            last_update_product: (new Date(Date.now())),
            emphasis_product,
            id_category
        }


        const schema = Yup.object().shape({
            id_product: Yup.string().uuid("Identificador produto não correspondente").required("Identificador do produto é obrigatório"),
            name_product: Yup.string().required("Nome do produto é obrigatório"),
            value_product: Yup.number().positive("O Valor do produto não pode ser negativo").required("Valor do produto é obrigatório"),
            description_product: Yup.string().required("A descrição do produto é obrigatório"),
            amount_stock_product: Yup.number().positive().integer().required("A quantidade do produto é obrigatório"),
            validate_product: Yup.date().required("A data de vencimento do produto é obrigatório"),
            emphasis_product: Yup.boolean().label("Destaque é obrigatório"),
            id_category: Yup.string().uuid("Identificador não válido").required("O indetificador da categoria é obrigatório"),
        });

        // console.log(dataProduct)

        try {
            await schema.validate(dataProduct, {
                abortEarly: false
            });

        } catch (error) {
            return response.status(406).json({errors: [error.errors], status: 'error'});
        }

        const productRepository = getConnection().getCustomRepository(ProductRepository);

        try {
            const result = productRepository.update(id_product, dataProduct);

            return response.status(200).json({result: result, status: 'sucess', message: `Produto ${name_product} atualizado com sucesso`});
        } catch (error) {
            return response.status(500).json({errors: [error.errors], status: 'error', message: 'Erro interno do servidor'});
        }


    }

    async deleteProduct(request: Request, response: Response) {
        const {id_product} = request.params;

        const schema = Yup.object().shape({
            id_product: Yup.string().uuid("Identificador do produto não corresponde").required("Identificador do produto é obrigatório")
        });

        try {
            await schema.validate({id_product},{
                abortEarly: false
            });
        } catch (error) {
            return response.status(406).json({errors: [error.errors], status: 'error'});
        }

        const productRepository = getConnection().getCustomRepository(ProductRepository);

        try {

            const result = productRepository.delete(id_product);

            return response.status(200).json({result: result, status: 'sucess', message: `Produto deletado com sucesso`});

        } catch (error) {

            return response.status(500).json({errors: [error.errors], status: 'error', message: 'Erro interno do servidor'});
        }
    }

}

export { ProductAdminController}
