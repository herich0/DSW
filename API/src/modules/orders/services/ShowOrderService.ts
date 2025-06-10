import { getCustomRepository } from "typeorm";
import Order from "../typeorm/entities/Order";
import OrdersRepository from "../typeorm/repositories/OrdersRepository";
import AppError from "@shared/errors/AppError";

interface IRequest{
    id:string;
}

export default class ShowOrderservice{

    public async execute({id}:IRequest):Promise<Order>{
        const ordersRepository=getCustomRepository(OrdersRepository);
        const order= await ordersRepository.findById(id);
        if(!order){
            throw new AppError('order not found');
        }
        return order;
    }
}