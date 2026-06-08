import type { Connection, RowDataPacket } from 'mysql2/promise';
import type { CatalogItem } from '../../domain/entities/catalogItem';
import type { CatalogRepository } from '../../domain/repositories/catalogRepository';

export class DatabaseCatalogRepository implements CatalogRepository {
  constructor(private readonly connection: Connection) {}

  async getAll(): Promise<CatalogItem[]> {
    try {
      const [rows] = await this.connection.query<RowDataPacket[]>(
        'SELECT id, name, description, price FROM catalog ORDER BY id ASC',
      );

      return rows.map((item) => ({
        id: Number(item.id),
        name: String(item.name),
        description: String(item.description),
        price: Number(item.price),
      }));
    } catch (error) {
      console.error('DatabaseCatalogRepository.getAll failed:', error);
      return [];
    }
  }
}
