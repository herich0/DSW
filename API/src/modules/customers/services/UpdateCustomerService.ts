import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import CustomerRepository from "../typeorm/repositories/CustomerRepository";
import Customer from "../typeorm/entities/Customer";

interface IRequest{
    id:string;
    name:string;
    email:string;
}

export default class CreateCustomerService{
    public async execute({id,name,email}:IRequest):Promise<Customer>{
        const customerRepository= getCustomRepository(CustomerRepository);
        const customer= await customerRepository.findById(id);
        if(!customer){
            throw new AppError('Customer not found.');
        }
        const emailExists=await customerRepository.findByEmail(email);
        if(emailExists && email!=customer.email){
            throw new AppError('Email address already used');
        }
        customer.name = name;
        customer.email = email;
        await customerRepository.save(customer);
        return customer;
    }
}