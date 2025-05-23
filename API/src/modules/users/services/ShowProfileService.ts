import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UserRepository";
import User from "../typeorm/entities/User";
import AppError from "@shared/errors/AppError";

interface IRequest{
    user_id:string;
}

export default class ShowProfileService{
    public async execute({user_id}:IRequest):Promise<User>{
        const userRepository = getCustomRepository(UserRepository);
        const user= await userRepository.findById(user_id);
        if(!user){
            throw new AppError('User not found.');
        }
        return user;
    }
}