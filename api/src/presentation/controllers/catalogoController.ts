import type { Request, Response } from 'express';
import type { GetCatalogListUseCase } from '../../usecases/getCatalogListUseCase';

export class CatalogoController {
  constructor(private readonly getCatalogListUseCase: GetCatalogListUseCase) {}

  async listCatalogo(req: Request, res: Response): Promise<Response> {
    try {
      const catalog = await this.getCatalogListUseCase.execute();
      return res.status(200).json(catalog);
    } catch (error) {
      console.error('CatalogoController.listCatalogo failed:', error);
      return res.status(500).json({ error: 'Unable to load catalog data' });
    }
  }
}
