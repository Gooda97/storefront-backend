import client from "../database";

// export type order = {
//   product_id: number;
//   quantity: number;
//   user_id: number;
// }
export type order_product = {
    order_id?: number;
    product_id: number;
    quantity: number
};

export type order = {
    id?: number;
    products: order_product[];
    user_id: number
}

export class orderClass {
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
        const sql = 'SELECT * FROM orders WHERE id=$1'
        const conn = await client.connect();

        const result = await conn.query(sql, [id]);

        conn.release();

        return result.rows[0];
    } catch (err) {
        throw new Error(`Error: ${err}`)
    }
  }

  async create (order: order): Promise<order> {
    const {products, user_id} = order

    try {
      const sql = "INSERT INTO orders (user_id) VALUES ($1) RETURNING *"
      const conn = await client.connect()
      const result = await conn.query(sql, [user_id])
      const order = result.rows[0];

      const sql1 = "INSERT INTO orders_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING product_id, quantity"
      const ordered = []

      for (const product of products) {
        const {product_id, quantity} = product

        const res = await conn.query(sql1, [order.id, product_id, quantity])

        ordered.push(res.rows[0])
      }

      conn.release()

      return {
        ...order,
        products: ordered
      }
    } catch (err) {
      throw new Error(`Could not add new order for user ${user_id}. ${err}`)
    }
  }

  async update (newData: order): Promise<order> {
    const {id, products, user_id} = newData

    try {
      const sql = "UPDATE orders SET user_id = $1 WHERE id = $2 RETURNING *"
      const conn = await client.connect()
      const result = await conn.query(sql, [user_id, id])
      const order = result.rows[0]

      const orderProductsSql = "UPDATE orders_products SET product_id = $1, quantity = $2 WHERE order_id = $3 RETURNING product_id, quantity"
      const orderProducts = []

      for (const product of products) {
        const {product_id, quantity} = product

        const res = await conn.query(orderProductsSql, [product_id, quantity, order.id])
        orderProducts.push(res.rows[0])
      }

      conn.release()

      return {
        ...order,
        products: orderProducts
      }
    } catch (err) {
      throw new Error(`Could not update order for user ${user_id}. ${err}`)
    }
  }


  
  async delete(id: number): Promise<order> {
    try {
        const sql1 = 'DELETE FROM orders_products WHERE order_id=$1'
        const sql = 'DELETE FROM orders WHERE id=$1 RETURNING *'
        const conn = await client.connect()

        const result = await conn.query(sql1, [id])
        const result2 = await conn.query(sql, [id])

        const ord = result2.rows[0]
        conn.release()

        return ord
    } catch (err) {
        throw new Error(`${err}`)
    }
  }
}
