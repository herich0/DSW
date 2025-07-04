import { getCustomRepository } from "typeorm";
import OrigemsRepository from "@modules/origens/typeorm/repositories/OrigensRepository";
import AppError from "@shared/errors/AppError";
import Campeao from "@modules/campeoes/typeorm/entities/Campeao";

interface IRequest{
  origem_id: string;
}

export default class ListCampeoesByOrigemService {
  public async execute({origem_id}:IRequest): Promise<Campeao[]> {
    const origensRepository = getCustomRepository(OrigemsRepository);

    const origem = await origensRepository.findOne(origem_id, {
      relations: ['campeoes'], 
    });

    if (!origem) {
      throw new AppError("Origem not found.");
    }

    return origem.campeoes;
  }
}
