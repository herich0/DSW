import { Router } from "express";
import ProfileController from "../controllers/ProfileController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import { celebrate, Joi, Segments } from "celebrate";

const profileRouter = Router();
const profileController = new ProfileController();
profileRouter.use(isAuthenticated);

profileRouter.get('/', async(req, res, next) =>{
    try{
        await profileController.show(req, res, next);
    }catch(err){
        next(err);
    }
});

profileRouter.put('/', celebrate({
    [Segments.BODY] : {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        old_password: Joi.string(),
        password: Joi.string().min(6).optional(),
        password_confirmation: Joi.string().valid(Joi.ref("password")).when("password", {is: Joi.exist(), then: Joi.required()})
    }
}),
    async(req, res, next) =>{
    try{
        await profileController.update(req, res, next);
    }catch(err){
        next(err);
    }
});

export default profileRouter;