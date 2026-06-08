import express, { type Request, type Response } from 'express';
import 'dotenv/config';
import { createDatabaseConnection } from './infra/database/mysqlConnection';
import { DatabaseCatalogRepository } from './infra/repositories/databaseCatalogRepository';
import { GetCatalogListUseCase } from './usecases/getCatalogListUseCase';
import { CatalogoController } from './presentation/controllers/catalogoController';
import catalogoRoutes from './presentation/routes/catalogoRoutes';

const app = express();
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'Catalog API',
    version: process.env.npm_package_version ?? '1.0.0',
  });
});

async function bootstrap(): Promise<void> {
  const port = Number(process.env.PORT ?? 3000);
  const connection = await createDatabaseConnection();

  const repository = new DatabaseCatalogRepository(connection);
  const useCase = new GetCatalogListUseCase(repository);
  const controller = new CatalogoController(useCase);

  app.use('/api/catalogo', catalogoRoutes(controller));

  app.listen(port, () => {
    console.log(`API running on port ${port}`);
  });
}

bootstrap().catch((error) => {
  console.error('Failed to start API server', error);
  process.exit(1);
});