import { EntityRepository, Repository } from "typeorm";
import Campeao from "../entities/Campeao";

@EntityRepository(Campeao)
export default class CampeaosRepository extends Repository<Campeao>{

    //esse método retorna uma promessa
    public async findByName(nome: string): Promise<Campeao | undefined>{
        const campeao = this.findOne({
            where: { nome }
        })
        return campeao;
    }
}