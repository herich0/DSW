import { Router } from "express";
import ForgotPasswordController from "../controllers/ForgotPasswordController";
import { celebrate, Joi, Segments } from "celebrate";
import ResetPasswordController from "../controllers/ResetPasswordController";

const passwordRouter = Router();
const forgotPasswordController= new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot',celebrate({
    [Segments.BODY]:{email:Joi.string().email().required()}
}), async (req,res,next)=>{
    try{
        forgotPasswordController.create(req,res,next);
    }catch(err){
        next(err);
    }
})

passwordRouter.post('/reset',celebrate({
    [Segments.BODY]:{
        token:Joi.string().uuid().required(),      
        password:Joi.string().required(),
        password_confirmation:Joi.string().required().valid(Joi.ref("password"))
    }
}), async (req,res,next)=>{
    try{
        resetPasswordController.create(req,res,next);
    }catch(err){
        next(err);
    }
})

export default passwordRouter;