import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Campeao from "../typeorm/entities/Campeao";
import CampeoesRepository from "../typeorm/repositories/CampeoesRepository";

interface IRequest {
  id: string;
  nome?: string;
  custo?: number;
  classe?: string;
  habilidade?: string;
  vida_base?: number;
}

export default class PartialUpdateCampeaoService {
  public async execute({id,nome,custo,classe,habilidade,vida_base}: IRequest): Promise<Campeao> {
    const campeoesRepository = getCustomRepository(CampeoesRepository);
    const campeao = await campeoesRepository.findOne(id);
    if (!campeao) {
      throw new AppError("Champion not found");
    }
    if (nome && nome !== campeao.nome) {
      const existing = await campeoesRepository.findByName(nome);
      if (existing) {
        throw new AppError("There is already one champion with this name");
      }
      campeao.nome = nome;
    }
    if (typeof custo === "number") campeao.custo = custo;
    if (classe) campeao.classe = classe;
    if (habilidade) campeao.habilidade = habilidade;
    if (typeof vida_base === "number") campeao.vida_base = vida_base;

    await campeoesRepository.save(campeao);
    return campeao;
  }
}