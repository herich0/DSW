import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import OrigemsRepository from "../typeorm/repositories/OrigensRepository";

interface IRequest {
  id: string;
}

export default class DeleteOrigemService {
  public async execute({ id }: IRequest): Promise<void> {
    const origensRepository = getCustomRepository(OrigemsRepository);

    const origem = await origensRepository.findOne(id);
    if (!origem) {
      throw new AppError("Origem not found.");
    }

    await origensRepository.remove(origem);
  }
}
