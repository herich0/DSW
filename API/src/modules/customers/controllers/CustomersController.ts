import { NextFunction, Request,Response } from "express";
import ListCustomerService from "../services/ListCustomerService";
import ShowCustomerService from "../services/ShowCustomerService";
import CreateCustomerService from "../services/CreateCustomerService";
import UpdateCustomerService from "../services/UpdateCustomerService";
import DeleteCustomerService from "../services/DeleteCustomerService";

export default class CustomersController{
    public async index(request:Request,response:Response,next:NextFunction):Promise<Response | void>{
        try{
            const ListCustomers = new ListCustomerService();
            const customers=await ListCustomers.execute();
            return response.json(customers);
        } catch(err){
            next(err);
        }
    }

    public async show(request:Request,response:Response,next:NextFunction):Promise<Response | void>{
        try{
            const{id}=request.params;
            const showCustomer=new ShowCustomerService();
            const customer=await showCustomer.execute({id});
            return response.json(customer);
        } catch(err){
            next(err);
        }
    }

    public async create(request:Request,response:Response,next:NextFunction):Promise<Response | void>{
        try{
            const{name,email}=request.body;
            const createCustomer=new CreateCustomerService();
            const customer=await createCustomer.execute({name,email});
            return response.json(customer);
        } catch(err){
            next(err);
        }
    }

    public async update(request:Request,response:Response,next:NextFunction):Promise<Response | void>{
        try{
            const{id}=request.params;
            const{name,email}=request.body;
            const updateCustomer=new UpdateCustomerService();
            const customer=await updateCustomer.execute({id,name,email});
            return response.json(customer);
        } catch(err){
            next(err);
        }
    }

    public async delete(request:Request,response:Response,next:NextFunction):Promise<Response | void>{
        try{
            const{id}=request.params;
            const deleteCustomer=new DeleteCustomerService();
            await deleteCustomer.execute({id});
            return response.json([]);
        } catch(err){
            next(err);
        }
    }
}