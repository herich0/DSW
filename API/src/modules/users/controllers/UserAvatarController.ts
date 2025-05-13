import { NextFunction, Request, Response } from "express";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

export default class UserAvatarController{
    public async update(request:Request,response:Response,next:NextFunction):Promise<Response | void>{
        try{
            const updateUserAvatarService= new UpdateUserAvatarService();
            const user=updateUserAvatarService.execute({user_id:request.user.id,avatarFileName:request.file?.filename as string});
            return response.json(user);
        }catch(err){
            next(err);
        }
    }
}