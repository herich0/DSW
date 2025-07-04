import { Request, Response, NextFunction } from 'express';

import CreateOrigemService from '../services/CreateOrigemService';
import DeleteOrigemService from '../services/DeleteOrigemService';
import ListOrigensService from '../services/ListOrigemService';
import ShowOrigemService from '../services/ShowOrigemService';
import UpdateOrigemService from '../services/UpdateOrigemService';
import ListCampeoesByOrigemService from '../services/ListCampeoesByOrigemService';
import PartialUpdateOrigemService from '../services/PartialUpdateOrigemService';

export default class OrigensController {
  public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const listOrigens = new ListOrigensService();
      const origens = await listOrigens.execute();
      return response.json(origens);
    } catch (err) {
      next(err);
    }
  }

  public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = request.params;
      const showOrigem = new ShowOrigemService();
      const origem = await showOrigem.execute({ id });
      return response.json(origem);
    } catch (err) {
      next(err);
    }
  }

  public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const {
        nome,
        descricao,
        tipo_bonus,
        campeoes_necessarios,
        beneficio_ativo,
      } = request.body;

      const createOrigem = new CreateOrigemService();
      const origem = await createOrigem.execute({
        nome,
        descricao,
        tipo_bonus,
        campeoes_necessarios,
        beneficio_ativo,
      });

      return response.status(201).json(origem);
    } catch (err) {
      next(err);
    }
  }

  public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = request.params;
      const {
        nome,
        descricao,
        tipo_bonus,
        campeoes_necessarios,
        beneficio_ativo,
      } = request.body;

      const updateOrigem = new UpdateOrigemService();
      const origem = await updateOrigem.execute({
        id,
        nome,
        descricao,
        tipo_bonus,
        campeoes_necessarios,
        beneficio_ativo,
      });

      return response.json(origem);
    } catch (err) {
      next(err);
    }
  }

  public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = request.params;
      const deleteOrigem = new DeleteOrigemService();
      await deleteOrigem.execute({ id });
      return response.status(204).send();
    } catch (err) {
      next(err);
    }
  }
  public async listCampeoesByOrigem(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = request.params;
      const listCampeoesByOrigem = new ListCampeoesByOrigemService();
      const campeoes = await listCampeoesByOrigem.execute({ origem_id: id });
      return response.json(campeoes);
    } catch (err) {
      next(err);
    }
  }

  public async partialUpdate(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = request.params;
      const { nome, descricao, tipo_bonus, campeoes_necessarios, beneficio_ativo } = request.body;
      const partialUpdateCampeao = new PartialUpdateOrigemService();
      const campeao = await partialUpdateCampeao.execute({ id, nome, descricao, tipo_bonus, campeoes_necessarios, beneficio_ativo });
      return response.json(campeao);
    } catch (err) {
      next(err);
    }
  }

}
