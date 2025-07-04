import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Campeao from "../typeorm/entities/Campeao";
import CampeoesRepository from "../typeorm/repositories/CampeoesRepository";

interface IRequest{
    id:string;
}

export default class ShowCampeaoService{

    public async execute({id}: IRequest) : Promise<Campeao | undefined>{
        const campeoesRepository = getCustomRepository(CampeoesRepository);
        const campeao = campeoesRepository.findOne(id);
        if (!campeao){
            throw new AppError ('champion not found')
        }
        return campeao;
    }
}
