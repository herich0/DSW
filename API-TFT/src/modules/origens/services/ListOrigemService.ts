import { getCustomRepository } from "typeorm";
import Origem from "../typeorm/entities/Origem";
import OrigemsRepository from "../typeorm/repositories/OrigensRepository";

export default class ListOrigemService {
  public async execute(): Promise<Origem[]> {
    const origensRepository = getCustomRepository(OrigemsRepository);
    const origens = await origensRepository.find();
    return origens;
  }
}
