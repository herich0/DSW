import { EntityRepository, Repository } from "typeorm";
import Origem from "../entities/Origem";

@EntityRepository(Origem)
export default class OrigemsRepository extends Repository<Origem>{

    //esse método retorna uma promessa
    public async findByName(nome: string): Promise<Origem | undefined>{
        const origem = await this.findOne({
            where: { nome }
        })
        return origem;
    }
    public async findById(id: string): Promise<Origem | undefined>{
        const origem = await this.findOne({
            where: { id }
        })
        return origem;
    }
}