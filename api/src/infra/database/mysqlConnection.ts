import { createConnection, type Connection } from 'mysql2/promise';

const DEFAULT_DB_PORT = 3306;
const MAX_RETRIES = 10;
const RETRY_DELAY_MS = 3000;

async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function createDatabaseConnection(): Promise<Connection> {
  const config = {
    host: process.env.DB_HOST ?? 'localhost',
    user: process.env.DB_USER ?? 'root',
    password: process.env.DB_PASSWORD ?? 'root',
    database: process.env.DB_NAME ?? 'app_db',
    port: Number(process.env.DB_PORT ?? DEFAULT_DB_PORT),
  };

  let lastError: unknown;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      console.log(`Connecting to MySQL database (attempt ${attempt}/${MAX_RETRIES})`);
      const connection = await createConnection(config);
      console.log('Connected to MySQL database');
      return connection;
    } catch (error) {
      lastError = error;
      console.warn(`MySQL connection failed on attempt ${attempt}:`, error);
      if (attempt < MAX_RETRIES) {
        await delay(RETRY_DELAY_MS);
      }
    }
  }

  throw new Error(`Unable to connect to MySQL after ${MAX_RETRIES} attempts: ${lastError}`);
}
