import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import CampeoesRepository from "../typeorm/repositories/CampeoesRepository";

interface IRequest{
    id:string;
}

export default class DeleteCampeaoService{

    public async execute({id}: IRequest) : Promise<void>{
        const campeoesRepository = getCustomRepository(CampeoesRepository);
        const campeao = await campeoesRepository.findOne(id);
        if (!campeao){
            throw new AppError ('champion not found')
        }
        await campeoesRepository.remove(campeao);
    }
}
