import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import ProductRepository from "../typeorm/repositories/ProductRepository";
import AppError from "@shared/errors/AppError";

interface IRequest{
    name:string;
    price:number;
    quantity:number;

}
export default class CreateProductService{
    public async execute({name,price,quantity}:IRequest):Promise<Product>{
        const productsRepository = getCustomRepository(ProductRepository);
        const productsExists = await productsRepository.findByName(name);
        if (productsExists){
            throw new AppError('There is already one product with this name');
        }
        const product=productsRepository.create({name,price,quantity});
        await productsRepository.save(product);
        return product;
    }
}