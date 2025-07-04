import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Origem from "../typeorm/entities/Origem";
import OrigemsRepository from "../typeorm/repositories/OrigensRepository";

interface IRequest {
  id: string;
  nome: string;
  descricao: string;
  tipo_bonus: string;
  campeoes_necessarios: string;
  beneficio_ativo: string;
}

export default class UpdateOrigemService {
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
      throw new AppError("Origem not found.");
    }

    const origemWithSameName = await origensRepository.findByName(nome);
    if (origemWithSameName && origemWithSameName.id !== id) {
      throw new AppError("Another origin already uses this name.");
    }

    origem.nome = nome;
    origem.descricao = descricao;
    origem.tipo_bonus = tipo_bonus;
    origem.campeoes_necessarios = campeoes_necessarios;
    origem.beneficio_ativo = beneficio_ativo;

    await origensRepository.save(origem);
    return origem;
  }
}
