import { Router } from 'express';
import type { CatalogoController } from '../controllers/catalogoController';

export default function catalogoRoutes(controller: CatalogoController) {
  const router = Router();
  router.get('/', controller.listCatalogo.bind(controller));
  return router;
}
