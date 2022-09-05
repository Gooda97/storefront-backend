import dotenv from 'dotenv';
import {Pool} from 'pg';

dotenv.config();

const {
  POSTGRES_PORT,
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB_TEST,
  ENV
} = process.env;

export let client: Pool;
console.log(ENV);

if (ENV === 'test') {
  client = new Pool({
    port: POSTGRES_PORT as unknown as number,
    host: POSTGRES_HOST,
    database: POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

if (ENV === 'dev') {
  client = new Pool({
    port: POSTGRES_PORT as unknown as number,
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

export default client;
