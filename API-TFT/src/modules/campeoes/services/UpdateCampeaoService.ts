import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Campeao from "../typeorm/entities/Campeao";
import CampeoesRepository from "../typeorm/repositories/CampeoesRepository";

interface IRequest{
    id:string;
    nome: string;
    custo :number;
    classe: string;
    habilidade :string;
    vida_base: number;
}

export default class UpdateCampeaoService{

    public async execute({id,nome,custo,classe,habilidade,vida_base}: IRequest) : Promise<Campeao | undefined>{
        const campeoesRepository = getCustomRepository(CampeoesRepository);
        const campeao = await campeoesRepository.findOne(id);
        if (!campeao){
            throw new AppError ('champion not found')
        }
        const campeaoExists = await campeoesRepository.findByName(nome);
        if (campeaoExists && nome!= campeao.nome){
            throw new AppError ('There is already one champion with name');
        }
        campeao.nome = nome;
        campeao.custo = custo;
        campeao.classe= classe; 
        campeao.habilidade = habilidade;
        campeao.vida_base = vida_base;
        return campeao;
    }
}
