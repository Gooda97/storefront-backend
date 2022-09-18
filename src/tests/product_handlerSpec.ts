// import supertest from "supertest"
// import jwt, {Secret} from "jsonwebtoken"

// import app from ".."
// import { product } from "../models/product"
// import {User, user_table} from "../models/user"

// const {
//     TOKEN_SECRET
//   } = process.env;

// const test = supertest(app)

// const table = new user_table();

// describe("Test product handler", () => {
//   const product: product = {
//     product_name: "tset",
//     price: 100
//   }

//   let token: string, userId: number, productId: number

//   (async () => {
//     const userData: User = {
//       username: "customer",
//       first_name: "fname",
//       last_name: "lname",
//       password: "password123"
//     }
//     const newUser = await table.create(userData);
//     const {token} = (await test.post("/users/authenticate").send(userData)).body

//     userId = jwt.verify(token, TOKEN_SECRET as Secret).user.id
//   })();

//   it("The index endpoint reachable", () => {
//     test.get("/products").then((res) => {
//       expect(res.status).toBe(200)
//     })
//   })

//   it("The create endpoint reachable", () => {
//     test.post("/products/create").send(product).set("Authorization", "bearer " + token).then((res) => {

//       expect(res.status).toBe(200)
//       productId = res.body.id
//     })
//   })

//   it("The read endpoint reachble", () => {
//     test.get(`/products/${productId}`).then((res) => {
//       expect(res.status).toBe(200)
//     })
//   })

//   it("The update endpoint reachble", () => {
//     const newProduct: product = {
//       ...product,
//       name: "CodeMerge 156 A",
//       price: 1299
//     }

//     test.put(`/products/${productId}`).send(newProduct).set("Authorization", "bearer " + token).then((res) => {
//       expect(res.status).toBe(200)
//     })
//   })

//   it("gets the delete endpoint", () => {
//     test.delete(`/products/${productId}`).set("Authorization", "bearer " + token).then((res) => {
//       expect(res.status).toBe(200);

//     (async () => {await test.delete(`/users/${userId}`).set("Authorization", "bearer " + token)})();
//     })
//   })
// })
