import supertest from "supertest"
import { createPrinter } from "typescript"
import app from "../index"
import { product } from "../models/product"
import {User, user_table} from "../models/user"

const request = supertest(app)

describe("Product Handler", () => {
  const prod: product = {
    product_name: "tset",
    price: 100
  }
  const Table = new user_table()
  let tok: string, userId: number, productId: number

  beforeAll(async () => {
    const userData: User = {
      username: "test_user",
      first_name: "f",
      last_name: "l",
      password: "123"
    }

    const res1 = await Table.create(userData)
    const res2 = await request.post("/users/authenticate").send(userData)
    console.log(res1)
    console.log(res2.body)
    const {token} = res2.body
    tok = token
    userId = res1.id as unknown as number
  })

  afterAll(async () => {
    await request.delete(`/users/${userId}`).set("Authorization", "bearer " + tok)
  })

  it("gets the create endpoint", (done) => {
    request
    .post("/products/create")
    .send(prod)
    .set("Authorization", "bearer " + tok)
    .then((res) => {
      const {body, status} = res

      expect(status).toBe(200)

      productId = body.id

      done()
    })
  })

  it("gets the index endpoint", (done) => {
    request
    .get("/products")
    .then((res) => {
      expect(res.status).toBe(200)
      done()
    })
  })

  it("gets the show endpoint", (done) => {
    request
    .get(`/products/${productId}`).set("Authorization", "bearer " + tok)
    .then((res) => {
      expect(res.status).toBe(200)
      done()
    })
  })

  it("gets the update endpoint", (done) => {
    const newProductData: product = {
      product_name: "new",
      price: 900
    }

    request
    .put(`/products/${productId}`)
    .send(newProductData)
    .set("Authorization", "bearer " + tok)
    .then((res) => {
      expect(res.status).toBe(200)
      done()
    })
  })

  it("gets the delete endpoint", (done) => {
    request.delete(`/products/${productId}`).set("Authorization", "bearer " + tok)
    .then((res) => {
      expect(res.status).toBe(200)
      done()
    })
  })
})
