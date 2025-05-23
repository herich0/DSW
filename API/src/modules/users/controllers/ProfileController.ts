import { NextFunction, Request, Response } from "express";
import ShowProfileService from "../services/ShowProfileService";
import UpdateProfileService from "../services/UpdateProfileService";

export default class ProfileController{
    public async show(request:Request,response:Response,next:NextFunction):Promise<Response | void>{
            try{
                const showprofile= new ShowProfileService();
                const user_id= await request.user.id;
                const user=  await showprofile.execute({user_id});
                return response.json(user);
            }catch(err){
                next(err);
            }
        }
        public async update(request:Request,response:Response,next:NextFunction):Promise<Response | void>{
            try{
                const user_id = request.user.id;
                const {name,email,password, old_password}= request.body;
                const updateProfile = new UpdateProfileService();
                const user= await updateProfile.execute({user_id,name,email,password, old_password});
                return response.json(user);
            }catch(err){
                next(err);
            }
        }
}