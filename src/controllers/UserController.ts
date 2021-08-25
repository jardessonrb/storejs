import { getConnection } from 'typeorm';
import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import * as Yup  from 'yup';
import '../utils/setLocaleYup';
import crypto from 'crypto';
import {SignJWT} from 'jose/jwt/sign';

class UserController{

    async createUser(request: Request, response: Response){
        const {
            name_user,
            email_user,
            password_user
        } = request.body;

        const schema = Yup.object().shape({
            name_user: Yup.string().required("O nome não poder ser vazio."),
            email_user: Yup.string().email("Email invalido").required("Email é um campo obrigatório"),
            password_user: Yup.string().min(6, "Senha deve conter no minimo 6 digitos").required("Campo de senha é obrigatório")
        });

        try {
            await schema.validate(request.body, {
                abortEarly: false
            });

        } catch (error) {
            return response.status(406).json({errors: error.errors, status: 'error'});
        }

        const userRepository = getConnection().getCustomRepository(UserRepository);

        const user = userRepository.create({
            name_user,
            email_user,
            password_user
        });


        try {
            const emailExists = await userRepository.isExistsEmail(email_user);

            if(!emailExists) {
              const {id_user, name_user} = await userRepository.save(user);

              return response.status(201).json({id_user, name_user, message: 'Usuário cadastrado com sucesso !', status: 'success'});
            }else{
              return response.status(406).json({message: "Email já cadastrado no sistema", status: 'error'});
            }
        } catch (error) {
            return response.status(500).json({error: [error.errors],message: "Erro interno", status: 'error'});
        }
    }

    async logIn(resquest: Request, response: Response){
      const [, hash] = resquest.headers.authorization.split(' ');
      const [email_user, password_user] = Buffer.from(hash, 'base64').toString().split(":");

      const schema = Yup.object().shape({
        email_user: Yup.string().email("Email invalido").required("Email é um campo obrigatório"),
        password_user: Yup.string().min(6, "Senha deve conter no minimo 6 digitos").required("Campo de senha é obrigatório")
      });

      try {
        await schema.validate({email_user, password_user}, {
            abortEarly: false
        });
      } catch (error) {
        return response.status(406).json({errors: error.errors, status: 'error'});
      }
      const userRepository = getConnection().getCustomRepository(UserRepository);

      const user = await userRepository.findOne({ email_user, password_user});

      if(user){
        return response.status(201).json({user, message: 'Usuário logado com sucesso !', status: 'success'});
      }

      return response.status(406).json({message: "Email ou senha inválido(s)", status: 'error'});
    }
}

export { UserController } ;
