import { getCustomRepository } from "typeorm";
import Order from "../typeorm/entities/Order";
import OrderRepository from "../typeorm/repositories/OrdersRepository";

export default class ListOrderService{
    public async execute():Promise<Order[]>{
        const ordersRepository = getCustomRepository(OrderRepository);
        const orders= await ordersRepository.find();
        return orders;
    }
}