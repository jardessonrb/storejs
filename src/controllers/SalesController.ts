import { Request, Response } from "express";
import { getConnection } from "typeorm";
import { SalesRepository } from "../repositories/SalesRepository";
import * as Yup from 'yup';
import { Product } from "../models/Product";

interface ProductsSales{
    id_product: string;
    name_product: string;
    value_product: number;
    quantity_product: number;
}

interface ProductsSalesValue{
    id_product: string;
    name_product: string;
    value_product: number;
    quantity_product: number;
    value_total_product: number;
}

class SaleController{
    async createSale(request: Request, response: Response){
        const {
            name_client_sales,
            cpf_client_sales,
            id_user_sales,
            date_of_sales,
            andressDeliverySales,
            products_sale
        } = request.body;

        let valueTotalSale = 0;

        const productSale: ProductsSalesValue[] = products_sale.map((product: ProductsSales) => {
            valueTotalSale += (product.quantity_product * product.value_product);
            return (
                {
                    id_product: product.id_product,
                    name_product: product.name_product,
                    value_product: product.value_product,
                    quantity_product: product.quantity_product,
                    value_total_product: (product.quantity_product * product.value_product)
                }
            );
        })

        const dataSalesComplet = {
            value_total_sales: valueTotalSale,
            status_sales: "pendente",
            name_client_sales,
            cpf_client_sales,
            id_user_sales,
            date_of_sales: (new Date(Date.now())),
            andressDeliverySales,
            productSale
        }

        const schema = Yup.object().shape({
            value_total_sales: Yup.number().positive('Valor total da venda inválido').required("Valor Total é Obrigatório"),
            status_sales: Yup.string().required('Status é um campo obrigatório'),
            name_client_sales: Yup.string().min(3).required('Nome do cliente é obrigatório'),
            cpf_client_sales: Yup.string().min(11, "Quantidade de digitos do CPF < 11").required('CPF do cliente é obrigatório'),
            id_user_sales: Yup.string().uuid("O identificador do cliente não correspodente").required("O identificador do cliente é obrigatório"),
            date_of_sales: Yup.date().required("Data da venda é obrigatório"),
            andressDeliverySales: Yup.object().shape({
                city_delivery_sales: Yup.string().required("Nome da cidade é obrigatório"),
                state_delivery_sales: Yup.string().required("Nome do estado é obrigatório"),
                street_delivery_sales: Yup.string().required("Nome da rua é obrigatório"),
                number_house_delivery_sales: Yup.number().integer().required("O numero da residência é obrigatório"),
                district_delivery_sales: Yup.string().required("Nome do bairro é obrigatório"),
                cep_delivery_sales: Yup.string().required("CEP é obrigatório"),
                apartment_delivery_sales: Yup.string().notRequired(),
                complement_delivery_sales: Yup.string().required("O complemento é obrigatório")
            }),
            productSale: Yup.array(Yup.object().shape({
                id_product: Yup.string().uuid("Identificador do produto é invalido").required("Identificador do produto é obrigatório"),
                name_product: Yup.string().required("Nome do produto é obrigatório"),
                value_product: Yup.number().positive("O valor do produto não pode ser < 0").required("O valor do produto é obrigatório"),
                quantity_product: Yup.number().positive("Quantidade do produto não pode ser zero"),
                value_total_product: Yup.number().positive("O valor total do produto não pode ser zero")
            }))
        });

        try {
            await schema.validate(dataSalesComplet, {
                abortEarly: false
            });
        } catch (error) {
            return response.status(406).json({errors: [error.errors], status: 'error'});
        }

        const salesRepository = getConnection().getCustomRepository(SalesRepository);

        const sales = salesRepository.create(dataSalesComplet);

        const myQueryRunnerTransaction = getConnection().createQueryRunner();
        let idSalesResult: string;

        await myQueryRunnerTransaction.startTransaction();
        try {

            const resultProduct = productSale.map(async (product: ProductsSalesValue) => {
                return await myQueryRunnerTransaction.manager.createQueryBuilder()
                .update(Product)
                .set({
                    amount_stock_product: () => `amount_stock_product - ${product.quantity_product}`
                })
                .where("id_product = :idProduct", {idProduct: product.id_product})
                .execute();
            })

            const resultSales = await myQueryRunnerTransaction.manager.save(sales);
            idSalesResult = resultSales.id_sales;

            await myQueryRunnerTransaction.commitTransaction();

        } catch (error) {
            await myQueryRunnerTransaction.rollbackTransaction();
        }finally{
            await myQueryRunnerTransaction.release();
        }

        try {
            const saleCreatedNow = await salesRepository.find({where: {id_sales: idSalesResult}});

            if(saleCreatedNow.length){
                return response.status(201).json({result:{saleCreatedNow}, message: "Compra realizada com sucesso", status: "sucess"});
            }

            return response.status(500).json({error: "compra não foi cadastrada no sistema", message: "Não foi possivel realizar sua comprar", status: "error"});

        } catch (error) {
            return response.status(500).json({error: error.errors, message: "Erro interno no servidor", status: "error"});
        }

    }

    async getSaleByUser(request: Request, response: Response){
        const { idHashUser } = request.params;

        const schema = Yup.object().shape({
            idHashUser: Yup.string().uuid("Identificador não correspondente").required("Identificador de usuario é obrigatório")
        });

        try {
            await schema.validate({idHashUser}, {
                abortEarly: false
            });
        } catch (error) {
            return response.status(406).json({error: [error.errors], status: "error"})
        }

        const salesRepository = getConnection().getCustomRepository(SalesRepository);

        const resultSale = await salesRepository.createQueryBuilder("sales").innerJoin("sales.andressDeliverySales", "AndressDeliverySales")
                                            .where("sales.id_user_sales = :idUser", {idUser: idHashUser})
                                            .orderBy("sales.date_of_sales")
                                            .getOne();

        console.log("Result sales: ", resultSale);
    }
}

export { SaleController }
