import client from "../database";

export type order_product = {
    order_id: number;
    product_id: number;
    quantity: number
};

export type order = {
    id?: number;
    products: order_product[];
    user_id: number
}

export class ordreClass {
  async index(): Promise<order[]> {
    try {
        const conn = await client.connect();
        const sql = 'SELECT * FROM orders';
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async show(id: number): Promise<order> {
    try {
        const sql = 'SELECT * FROM orders WHERE id=($1)'
        const conn = await client.connect()

        const result = await conn.query(sql, [id])

        conn.release()

        return result.rows[0]
    } catch (err) {
        throw new Error(`Error: ${err}`)
    }
  }

  async create(o : order): Promise<order> {
    try {
        const sql = 'INSERT INTO orders (userID) VALUES($1) RETURNING *'
        const conn = await client.connect()

        const result = await conn
            .query(sql, [o.user_id])

        const ord = result.rows[0];

        const sql1 = 'INSERT INTO orders_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING product_id, quantity'
        const ordered = []
        const products = o.products
        for (const product of products) {
            const orderProducts = await conn.query(sql1, [o.id, product.product_id, product.quantity])
            ordered.push(orderProducts.rows[0]) 
        }

        conn.release();
        return {...ord, ordered};
    } catch (err) {
        throw new Error(`${err}`);
    }
  }

  async update (data: order): Promise<order> {
    try {
      const sql = "SELECT * FROM orders WHERE id = $1 RETURNING *"
      const conn = await client.connect()
      const result = await conn.query(sql, [data.id])
      const order = result.rows[0]

      const sql1 = "UPDATE order_products SET product_id = $1, quantity = $2 WHERE order_id = $3 RETURNING product_id, quantity"
      const ordered = []

      for (const product of data.products) {
        const result = await conn.query(sql1, [product.product_id, product.quantity, order.id])
        ordered.push(result.rows[0])
      }

      conn.release()

      return {
        ...order,
        ordered
      }
    } catch (err) {
      throw new Error(`${err}`)
    }
  }

  async delete(id: number): Promise<order> {
    try {
        const sql = 'DELETE FROM orders WHERE id=($1)'
        const conn = await client.connect()

        const result = await conn.query(sql, [id])

        const prod = result.rows[0]

        conn.release()

        return prod
    } catch (err) {
        throw new Error(`${err}`)
    }
  }
}
