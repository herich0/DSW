import { getCustomRepository } from "typeorm";
import CustomerRepository from "../typeorm/repositories/CustomerRepository";
import Customer from "../typeorm/entities/Customer";
import AppError from "@shared/errors/AppError";

interface IRequest{
    id:string;
}

export default class ShowProfileService{
    public async execute({id}:IRequest):Promise<Customer>{
        const customerRepository = getCustomRepository(CustomerRepository);
        const customer= await customerRepository.findById(id);
        if(!customer){
            throw new AppError('Customer not found.');
        }
        return customer;
    }
}