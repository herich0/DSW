import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UserRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import AppError from "@shared/errors/AppError";
import EtherealMail from "@config/mail/EtherealMail";
import path from "path";

interface IRequest{
    email:string;
}

export default class SendForgotPasswordEmailService {
    public async execute ({email}:IRequest):Promise <void>{
        const userRepository = getCustomRepository(UserRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository);
        const forgotPasswordTemplate =path.resolve(__dirname,'..','views','forgot_password.hbs');
        const user = await userRepository.findByEmail(email);
        if(!user){
            throw new AppError('User does not exists.');
        }
        const {token}= await userTokensRepository.generate(user.id);
        console.log(token);
        await EtherealMail.sendMail({
            to:{name:user.name, email:user.email},
            subject: '[API VENDAS] Recuperação de Senha',
            templateData:{
                file:forgotPasswordTemplate,
                variables:{
                    name:user.name,
                    link:`http://localhost:3000/reset_password?token=${token}`
                }
            }
        });
    }
}