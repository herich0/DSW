import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Origem from "../typeorm/entities/Origem";
import OrigemsRepository from "../typeorm/repositories/OrigensRepository";

interface IRequest {
  id: string;
}

export default class ShowOrigemService {
  public async execute({ id }: IRequest): Promise<Origem> {
    const origensRepository = getCustomRepository(OrigemsRepository);

    const origem = await origensRepository.findOne(id);
    if (!origem) {
      throw new AppError("Origin not found.");
    }

    return origem;
  }
}
