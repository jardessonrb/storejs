import { getCustomRepository, getConnection } from 'typeorm';
import { Request, Response } from 'express';
import { ProductRepository } from '../repositories/ProductRepository';
import * as Yup from 'yup';
import '../Utils/setLocaleYup';


class ProductController{

    async getAllProductsOrderEmphasis(request: Request, response: Response){
        const productRepository = getConnection().getCustomRepository(ProductRepository);

        try {
            const resultSearchProductEmphasis = await productRepository.getAllProductsOrderEmphasisRepository();

            return response.status(200).json({result: resultSearchProductEmphasis, status: 'sucess'});
            
        } catch (error) {
            return response.status(500).json({errors: error, status: 'error ..', message: 'Erro interno do servidor ...'});
            
        }
    }

    async getProductsForPage(request: Request, response: Response){
        let { page = 1  } = request.query;
        console.log("Page: ", page);
        if(!page){
            page = 1;
        }
        // console.log("Page: ", page);
        const productRepository = getConnection().getCustomRepository(ProductRepository);

        try {
            const resultSearchProductPage = await productRepository.getProductsForPageRepository(Number(page));

            return response.status(200).json({result: resultSearchProductPage, status: 'sucess'});
            
        } catch (error) {
            return response.status(500).json({errors: error, status: 'error ..', message: 'Erro interno do servidor ...'});
            
        }
    }

    async getProductByLikeName(request: Request, response: Response){
        const { name  } = request.query;
            
        const productRepository = getConnection().getCustomRepository(ProductRepository);

        try {
            const resultSearchProductLike = await productRepository.getProductByLikeNameRepository(name.toString());
            return response.status(200).json({result: resultSearchProductLike, status: 'sucess'});
            
        } catch (error) {
            return response.status(500).json({errors: error, status: 'error ..', message: 'Erro interno do servidor ...'});
        }
    }

    async getProductBySpecificName(request: Request, response: Response){
        let { name  } = request.query;
        if(!name || name === '' ){
            return response.status(406).json({status: 'error ..', message: 'Nome do produto inválido ...'});
        }
        const productRepository = getConnection().getCustomRepository(ProductRepository);
        try {
            const resultSearchSpecificProduct = await productRepository.getProductBySpecificNameRepository(name.toString());
            return response.status(200).json({result: resultSearchSpecificProduct, status: 'sucess'});
            
        } catch (error) {
            return response.status(500).json({errors: error, status: 'error ..', message: 'Erro interno do servidor ...'});
        }
    }
    
}


export { ProductController } ;