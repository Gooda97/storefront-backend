import client from "../database";

export type product = {
  id?: number;
  product_name: string;
  product_type: string;
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
        const sql = 'INSERT INTO products (name, type, price) VALUES($1, $2, $3) RETURNING *'
        const conn = await client.connect()

        const result = await conn
            .query(sql, [p.product_name, p.product_type, p.price])

        const prod = result.rows[0];
        conn.release();
        return prod;
    } catch (err) {
        throw new Error(`${err}`);
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
    const {id, product_name, price, product_type} = prod

    try {
      const sql = "UPDATE products SET product_name = $1, product_type= $2, price = $3 WHERE id = $4 RETURNING *"
      const connection = await client.connect()
      const result = await connection.query(sql, [product_name, product_type, price, id])

      connection.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`${err}`)
    }
  }
}
