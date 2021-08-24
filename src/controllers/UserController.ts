import { getConnection } from 'typeorm';
import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import * as Yup  from 'yup';
import '../utils/setLocaleYup';

class UserController{

    async createUser(request: Request, response: Response){
        const {
            name_user,
            email_user,
            password_user
        } = request.body;

        const schema = Yup.object().shape({
            name_user: Yup.string().required("O nome não poder ser vazio ..."),
            email_user: Yup.string().email("Email invalido").required("Email é um campo obrigatório"),
            password_user: Yup.string().min(6, "Senha deve conter no minimo 6 digitos").required("Campo de senha é obrigatório")
        });

        try {
            await schema.validate(request.body, {
                abortEarly: false
            });

        } catch (error) {

            return response.status(406).json(error.errors);
        }

        const userRepository = getConnection().getCustomRepository(UserRepository);

        const user = userRepository.create({
            name_user,
            email_user,
            password_user
        });


        try {
            const emailExists = await userRepository.find({select: ["email_user"], where: {email_user: email_user}});

            if(emailExists.length === 0) {
                const {id_user, name_user} = await userRepository.save(user);
                return response.status(201).json({id_user, name_user, message: 'Usuário cadastrado com sucesso !'});
            }else{
                return response.status(406).json({message: "Email já cadastrado no sistema"});
            }
        } catch (error) {
            return response.status(500).json({error: [error.errors],message: "Email já cadastrado no sistema", status: 'error'});
        }
    }
}

export { UserController } ;
