import supertest from "supertest"
import jwt, {Secret} from "jsonwebtoken"
import app from "../index"
import { order } from "../models/order"
import {User, user_table} from "../models/user"
import { product } from "../models/product"

const request = supertest(app)
const SECRET = process.env.TOKEN_SECRET as Secret

describe("Order Handler", () => {
  let Table:user_table= new user_table(), token: string, order: order, user_id: number, product_id: number, order_id: number

  beforeAll(async () => {
    const userData: User = {
      username: "ordertester",
      first_name: "Order",
      last_name: "Tester",
      password: "password123"
    }
    const productData: product = {
      product_name: "test_prod",
      price: 100
    }

    try{
      const res = await Table.create(userData)
      const res2 = await request.post("/users/authenticate").send(userData)
      
      token = res2.body.token
      user_id = res.id as unknown as number

      const {body} = await request.post("/products/create").set("Authorization", "bearer " + token).send(productData)
      product_id = body.id

      order = {
        products: [{
          product_id,
          quantity: 5
        }],
        user_id
      }
    }catch(err) {
      throw new Error(`${err}`)
    }
  })

  afterAll(async () => {
    try{
      await request.delete(`/users/${user_id}`).set("Authorization", "bearer " + token)
      await request.delete(`/products/${product_id}`).set("Authorization", "bearer " + token)
    }catch(err) {
      throw new Error(`${err}`)
    }
  })

  it("gets the create endpoint", (done) => {
    request
    .post("/orders/create")
    .send(order)
    .set("Authorization", "bearer " + token)
    .then((res) => {
      const {body, status} = res

      expect(status).toBe(200)

      order_id = body.id

      done()
    })
  })

  it("gets the index endpoint", (done) => {
    request
    .get("/orders")
    .set("Authorization", "bearer " + token)
    .then((res) => {
      expect(res.status).toBe(200)
      done()
    })
  })

  it("gets the read endpoint", (done) => {
    request
    .get(`/orders/${order_id}`)
    .set("Authorization", "bearer " + token)
    .then((res) => {
      expect(res.status).toBe(200)
      done()
    })
  })

  it("gets the update endpoint", (done) => {
    const newOrder: order = {
        products: [{
          product_id,
          quantity: 10
        }],
        user_id
      }

    request
    .put(`/orders/${order_id}`)
    .send(newOrder)
    .set("Authorization", "bearer " + token)
    .then((res) => {
      expect(res.status).toBe(200)
      done()
    })
  })

  it("gets the delete endpoint", (done) => {
    request.delete(`/orders/${order_id}`).set("Authorization", "bearer " + token)
    .then((res) => {
      expect(res.status).toBe(200)
      done()
    })
  })
})
