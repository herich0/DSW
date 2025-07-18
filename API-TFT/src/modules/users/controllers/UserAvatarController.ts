import { NextFunction, Request, Response } from "express";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

export default class UsersAvatarController{

  public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
    try{
        const updateAvatar = new UpdateUserAvatarService();
        const user = updateAvatar.execute({user_id: request.user.id,
          avatarFileName: request.file?.filename as string});
        return response.json(user);
    }catch (err) {
        next(err);
      }
  }
}
