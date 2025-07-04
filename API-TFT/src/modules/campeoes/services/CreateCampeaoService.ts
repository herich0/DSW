import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Campeao from "../typeorm/entities/Campeao";
import CampeoesRepository from "../typeorm/repositories/CampeoesRepository";
import OrigensRepository from "@modules/origens/typeorm/repositories/OrigensRepository";

interface IRequest{
    nome: string;
    custo :number;
    classe: string;
    habilidade :string;
    vida_base: number;
    origem_id:string;
}

export default class CreateCampeaoService{

    public async execute({nome, custo, classe,habilidade,vida_base,origem_id}: IRequest) : Promise<Campeao>{
        const campeoesRepository = getCustomRepository(CampeoesRepository);
        const origensRepository = getCustomRepository(OrigensRepository);
        
        //para criar um campeão, não podemos ter um outro compeão com o mesmo nome
        const campeaoExists = await campeoesRepository.findByName(nome);
        if(campeaoExists){
            throw new AppError('There is already one champion with this name.');
        }
        const origem = await origensRepository.findById(origem_id);
        if (!origem) {
            throw new AppError("Origem not found.");
        }

        const campeao = campeoesRepository.create({
            nome,custo,classe,habilidade,vida_base, origem
        });
        await campeoesRepository.save(campeao);
        return campeao;
    }
}
