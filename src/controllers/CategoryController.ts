import { getConnection, getCustomRepository} from 'typeorm';
import { Request, Response } from 'express';
import { CategoryRepository } from '../repositories/CategoryRepository';
import * as Yup from 'yup';
import '../Utils/setLocaleYup';

class CategoryController{

    async createCategory(request: Request, response: Response){
        const {
            name_category,
            description_category
        } = request.body;

        const schema = Yup.object().shape({
            name_category: Yup.string().required("Nome da categoria é obrigatório"),
            description_category: Yup.string().required("Descrição da categoria é obigatória")
        });

        try {
            await schema.validate(request.body, {
                abortEarly: false
            });

        } catch (error) {

            return response.status(406).json(error.errors);
        }
        const categoryRepository = getConnection().getCustomRepository(CategoryRepository);

        const category = categoryRepository.create({
            name_category,
            description_category
        });

        const nameCategoryExists = await categoryRepository.find({select: ["name_category"], where: {name_category: name_category}})

        if(nameCategoryExists.length === 0){
            const {name_category, description_category} = await categoryRepository.save(category);

            return response.status(201).json({message: `Categoria ${name_category} cadastrada com sucesso`});
        }

        return response.status(406).json({message: "Essa categoria já existe"});
    }
}

export { CategoryController };
