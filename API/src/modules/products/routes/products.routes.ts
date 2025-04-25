import { Router } from "express";
import { celebrate,Joi,Segments } from "celebrate";
import ProductsController from "../controllers/ProductsController";

const productsRouter =Router();
const productsController=new ProductsController();

productsRouter.get('/',async(req,res,next)=>{
    try{
        await productsController.index(req, res,next);
    }catch(err){
        next(err);
    }
});

productsRouter.get('/:id', celebrate({
    [Segments.PARAMS] : {id: Joi.string().uuid().required()}
  }),
  async (req, res, next) => {
    try {
      await productsController.show(req, res, next);
    } catch (err) {
      next(err);
    }
  });

  productsRouter.post('/',  celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        quantity: Joi.number().required(),
    }
  }),
  async (req, res, next) => {
    try {
      await productsController.create(req, res, next);
    } catch (err) {
      next(err);
    }
  });

  productsRouter.put('/:id',  celebrate({
    [Segments.PARAMS] : {id: Joi.string().uuid().required()},
    [Segments.BODY]: {
        name: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        quantity: Joi.number().required(),
    }
  }),async (req, res, next) => {
    try {
      await productsController.update(req, res, next);
    } catch (err) {
      next(err);
    }
  });

  productsRouter.delete('/:id', celebrate({
    [Segments.PARAMS] : {id: Joi.string().uuid().required()}
  }), async (req, res, next) => {
    try {
      await productsController.delete(req, res, next);
    } catch (err) {
      next(err);
    }
  });

export default productsRouter;