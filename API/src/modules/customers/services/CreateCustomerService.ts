import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/AppError";
import CustomerRepository from "../typeorm/repositories/CustomerRepository";
import Customer from "../typeorm/entities/Customer";

interface IRequest{
    name:string;
    email:string;
}

export default class CreateCustomerService{
    public async execute({name,email}:IRequest):Promise<Customer>{
        const customerRepository= getCustomRepository(CustomerRepository);
        const emailExists=await customerRepository.findByEmail(email);
        if(emailExists){
            throw new AppError('Email address already used');
        }
        const customer=customerRepository.create({name,email});
        await customerRepository.save(customer);
        return customer;
    }
}