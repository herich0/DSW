import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Origem from "../typeorm/entities/Origem";
import OrigemsRepository from "../typeorm/repositories/OrigensRepository";

interface IRequest {
  id: string;
  nome?: string;
  descricao?: string;
  tipo_bonus?: string;
  campeoes_necessarios?: string;
  beneficio_ativo?: string;
}

export default class PartialUpdateOrigemService {
  public async execute({
    id,
    nome,
    descricao,
    tipo_bonus,
    campeoes_necessarios,
    beneficio_ativo,
  }: IRequest): Promise<Origem> {
    const origensRepository = getCustomRepository(OrigemsRepository);

    const origem = await origensRepository.findOne(id);
    if (!origem) {
      throw new AppError("Origin not found.");
    }

    if (nome && nome !== origem.nome) {
      const existing = await origensRepository.findByName(nome);
      if (existing) {
        throw new AppError("There is already one Origin with this name");
      }
      origem.nome = nome;
    }
    if(descricao)origem.descricao = descricao;
    if(tipo_bonus)origem.tipo_bonus = tipo_bonus;
    if(campeoes_necessarios)origem.campeoes_necessarios = campeoes_necessarios;
    if(beneficio_ativo)origem.beneficio_ativo = beneficio_ativo;

    await origensRepository.save(origem);
    return origem;
  }
}
