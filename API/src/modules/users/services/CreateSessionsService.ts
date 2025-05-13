import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UserRepository";
import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import User from "../typeorm/entities/User";
import { sign } from "jsonwebtoken";
import auth from "@config/auth";

interface IRequest{
    email:string;
    password:string;
}

interface IResponse{
    user:User;
    token:String;
}

export default class CreateSessionsService{
    public async execute({email,password}:IRequest): Promise<IResponse>{
        const userRepository =getCustomRepository(UserRepository);
        const user = await userRepository.findByEmail(email);
        if(!user){
            throw new AppError('Incorret email/password combination',401)
        }
        const passwordConfirmed = await compare(password,user.password);
        if(!passwordConfirmed){
            throw new AppError('Incorret email/password combination',401)
        }
        const token = sign({}, auth.jwt.secret, {
            subject:user.id,
            expiresIn:'1d'
        });
        return {user,token};
    }
}