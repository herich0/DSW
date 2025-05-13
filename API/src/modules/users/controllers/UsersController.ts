import { NextFunction, Request, Response } from "express";
import ListUserService from "../services/ListUserService";
import CreateUserService from "../services/CreateUserService";

export default class UsersController{
    public async index(request:Request,response:Response,next:NextFunction):Promise<Response | void>{
        try{
            const listUser= new ListUserService();
            const users= await listUser.execute();
            return response.json(users);
        }catch(err){
            next(err);
        }
    }
    public async create(request:Request,response:Response,next:NextFunction):Promise<Response | void>{
        try{
            const {name,email,password}= request.body;
            const createUser= new CreateUserService();
            const user= await createUser.execute({name,email,password});
            return response.json(user);
        }catch(err){
            next(err);
        }
    }
}