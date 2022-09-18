import { QueryResult } from "pg";
import client from "../database";

export type product = {
  id?: number;
  product_name: string;
  price: number;
};

export class store {
  async index(): Promise<product[]> {
    try {
        const conn = await client.connect();
        const sql = 'SELECT * FROM products';
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async show(id: number): Promise<product> {
    try {
        const sql = 'SELECT * FROM products WHERE id=($1)'
        const conn = await client.connect()

        const result = await conn.query(sql, [id])

        conn.release()

        return result.rows[0]
    } catch (err) {
        throw new Error(`Error: ${err}`)
    }
  }

  async create(p : product): Promise<product> {
    try {
        const sql = 'INSERT INTO products (product_name, price) VALUES($1, $2) RETURNING *'
        const conn = await client.connect()

        const result = await conn.query(sql, [p.product_name, p.price]);

        const prod = result.rows[0];
        conn.release();
        return prod;
    } catch (err) {
        throw new Error(`Unable to create a new user: ${err}`);
    }
  }

  async delete(id: number): Promise<product> {
    try {
        const sql = 'DELETE FROM products WHERE id=($1)'
        const conn = await client.connect()

        const result = await conn.query(sql, [id])

        const prod = result.rows[0]

        conn.release()

        return prod
    } catch (err) {
        throw new Error(`${err}`)
    }
  }

  async update (prod: product): Promise<product> {
    const {id, product_name, price} = prod

    try {
      const sql = "UPDATE products SET product_name = $1, price = $2 WHERE id = $3 RETURNING product_name, price"
      const connection = await client.connect()
      const result = await connection.query(sql, [product_name, price, id])

      connection.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`${err}`)
    }
  }
}
