import supertest from "supertest"

import app from "../index"
import User, { user_table } from "../models/user"


const Table = new user_table();

const request = supertest(app)

describe("User Handler", () => {
  let tok: string, userId: number
  let userData: User;

  beforeAll(async () => {
      userData = {
      username: "test_user",
      first_name: "f",
      last_name: "l",
      password: "123"
    }

    try{
      const res1 = await Table.create(userData)
      const res2 = await request.post("/users/authenticate").send(userData)
      console.log(res1)
      console.log(res2.body)
      const {token} = res2.body
      tok = token
      userId = res1.id as unknown as number
    }catch(err){
      throw new Error(`${err}`)
    }
  })

  it("gets the create endpoint", (done) => {
    try{
      request.post("/users/create").send(userData).then((res) => {
        const {status} = res
        expect(status).toBe(200)
        done()
      })
    }catch(err){
      throw new Error(`${err}`)
    }
  })

  it("gets the index endpoint", (done) => {
    try{
      request.get("/users").set("Authorization", "bearer " + tok).then((res) => {
        expect(res.status).toBe(200)
        done()
      })
    }catch(err){
      throw new Error(`${err}`)
    }
  })

  it("gets the read endpoint", (done) => {
    try{
      request.get(`/users/${userId}`).set("Authorization", "bearer " + tok).then((res) => {
        expect(res.status).toBe(200)
        done()
      })
    }catch(err){
      throw new Error(`${err}`)
    }
  })

  it("gets the update endpoint", (done) => {
    const newUserData: User = {
      ...userData,
      first_name: "test11",
      last_name: "test22"
    }

    try{
      request.put(`/users/${userId}`).send(newUserData).set("Authorization", "bearer " + tok).then((res) => {
        expect(res.status).toBe(200)
        done()
      })
    }catch(err){
      throw new Error(`${err}`)
    }
  })

  it("gets the auth endpoint", (done) => {
    try{
      request.post("/users/authenticate").send({
        username: userData.username,
        password: userData.password
      }).set("Authorization", "bearer " + tok).then((res) => {
        expect(res.status).toBe(200)
        done()
      })
    }catch(err){
      throw new Error(`${err}`)
    }
  })

  it("gets the auth endpoint with wrong password", (done) => {
    try{
      request.post("/users/authenticate").send({
        username: userData.username,
        password: "wrongpw"
      }).set("Authorization", "bearer " + tok).then((res) => {
        expect(res.status).toBe(401)
        done()
      })
    }catch(err){
      throw new Error(`${err}`)
    }
  })

  it("gets the delete endpoint", (done) => {
    try{
      request.delete(`/users/${userId}`).set("Authorization", "bearer " + tok).then((res) => {
        expect(res.status).toBe(200)
        done()
      })
    }catch(err){
      throw new Error(`${err}`)
    }
  })
})
