import { getCustomRepository } from "typeorm";
import Campeao from "../typeorm/entities/Campeao";
import CampeoesRepository from "../typeorm/repositories/CampeoesRepository";


export default class ListCampeaoService{

    public async execute() : Promise<Campeao[]>{
        const campeoesRepository = getCustomRepository(CampeoesRepository);
        const campeoes = campeoesRepository.find();
        return campeoes;
    }
}
