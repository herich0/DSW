import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Origem from "../typeorm/entities/Origem";
import OrigensRepository from "../typeorm/repositories/OrigensRepository";

interface IRequest {
  nome: string;
  descricao: string;
  tipo_bonus: string;
  campeoes_necessarios: string;
  beneficio_ativo: string;
}

export default class CreateOrigemService {
  public async execute({
    nome,
    descricao,
    tipo_bonus,
    campeoes_necessarios,
    beneficio_ativo,
  }: IRequest): Promise<Origem> {
    const origensRepository = getCustomRepository(OrigensRepository);

    const origemExists = await origensRepository.findByName(nome);
    if (origemExists) {
      throw new AppError("There is already one origin with this name.");
    }

    const origem = origensRepository.create({
      nome,
      descricao,
      tipo_bonus,
      campeoes_necessarios,
      beneficio_ativo,
    });

    await origensRepository.save(origem);
    return origem;
  }
}
