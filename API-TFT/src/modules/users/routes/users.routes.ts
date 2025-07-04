import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import UsersController from "../controllers/UserController";
import isAuthenticadted from "../../../shared/http/middlewares/IsAuthenticated";
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsersAvatarController from "../controllers/UserAvatarController";


const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UsersAvatarController();
const upload = multer(uploadConfig);


usersRouter.get('/',isAuthenticadted, async (req, res, next) => {
    try {
      await usersController.index(req, res, next);
    } catch (err) {
      next(err);
    }
  });

usersRouter.post('/',  celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }
}),
async (req, res, next) => {
  try {
    await usersController.create(req, res, next);
  } catch (err) {
    next(err);
  }
});
usersRouter.patch('/avatar', isAuthenticadted, 
  upload.single('avatar'), 
  async(req, res, next) =>{
  try{
    await userAvatarController.update(req, res, next);
  }catch (err) {
    next(err);
  }
});


export default usersRouter;
