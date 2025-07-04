import { Request, Response, NextFunction } from "express"; // Importe o NextFunction
import ShowProfileService from "../services/ShowProfileService";
import UpdateProfileService from "../services/UpdateProfileService";

export default class ProfileController{

  public async show(request: Request, response: Response, next: NextFunction): Promise<void> { // Mude para Promise<void>
    try {
      const showProfile = new ShowProfileService();
      const user_id = request.user.id;
      const user = await showProfile.execute({ user_id });
      
      response.json(user); // Remova o "return"
    } catch (err) {
      next(err);
    }
  }

  public async update(request: Request, response: Response, next: NextFunction): Promise<void> { // Mude para Promise<void>
    try {
      const user_id = request.user.id;
      const { name, email, password, old_password } = request.body;
      const updateProfile = new UpdateProfileService();
      const user = await updateProfile.execute({ user_id, name, email, password, old_password });

      response.json(user); // Remova o "return"
    } catch (err) {
      next(err);
    }
  }
}