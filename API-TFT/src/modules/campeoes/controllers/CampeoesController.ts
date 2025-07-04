import { Request, Response, NextFunction } from 'express';

import CreateCampeaoService from "../services/CreateCampeaoService";
import DeleteCampeaoService from "../services/DeleteCampeaoService";
import ListCampeoesService from "../services/ListCampeaoService";
import ShowCampeaoService from "../services/ShowCampeaoService";
import UpdateCampeaoService from "../services/UpdateCampeaoService";
import PartialUpdateCampeaoService from "../services/PartialUpdateCampeaoService";

export default class CampeoesController {

  public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const listCampeoes = new ListCampeoesService();
      const campeoes = await listCampeoes.execute();
      return response.json(campeoes);
    } catch (err) {
      next(err);
    }
  }

  public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = request.params;
      const showCampeao = new ShowCampeaoService();
      const campeao = await showCampeao.execute({ id });
      return response.json(campeao);
    } catch (err) {
      next(err);
    }
  }

  public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { nome, custo, classe, habilidade, vida_base, origem_id } = request.body;
      const createCampeao = new CreateCampeaoService();
      const campeao = await createCampeao.execute({ nome, custo, classe, habilidade, vida_base, origem_id });
      return response.json(campeao);
    } catch (err) {
      next(err);
    }
  }

  public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = request.params;
      const { nome, custo, classe, habilidade, vida_base } = request.body;
      const updateCampeao = new UpdateCampeaoService();
      const campeao = await updateCampeao.execute({ id, nome, custo, classe, habilidade, vida_base });
      return response.json(campeao);
    } catch (err) {
      next(err);
    }
  }

  public async partialUpdate(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = request.params;
      const { nome, custo, classe, habilidade, vida_base } = request.body;
      const partialUpdateCampeao = new PartialUpdateCampeaoService();
      const campeao = await partialUpdateCampeao.execute({ id, nome, custo, classe, habilidade, vida_base });
      return response.json(campeao);
    } catch (err) {
      next(err);
    }
  }

  public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = request.params;
      const deleteCampeao = new DeleteCampeaoService();
      await deleteCampeao.execute({ id });
      return response.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
