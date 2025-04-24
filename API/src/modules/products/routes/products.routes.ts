import { Router } from "express";
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

productsRouter.get('/:id',async(req,res,next)=>{
    try{
        await productsController.index(req, res,next);
    }catch(err){
        next(err);
    }
});

productsRouter.post('/',async(req,res,next)=>{
    try{
        await productsController.create(req,res,next);
    }catch(err){
        next(err);
    }
});

productsRouter.put('/',async(req,res,next)=>{
    try{
        await productsController.update(req,res,next);
    }catch(err){
        next(err);
    }
});

productsRouter.delete('/',async(req,res,next)=>{
    try{
        await productsController.delete(req,res,next);
    }catch(err){
        next(err);
    }
});

export default productsRouter;