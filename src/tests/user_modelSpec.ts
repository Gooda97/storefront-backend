import { User,user_table } from "../models/user"
import bcrypt from 'bcrypt'


const {PEPPER,
SALT_ROUNDS} = process.env;

const Table = new user_table()

describe("User Model", () => {
  const user: User = {
    username: "customer",
    first_name: "fname",
    last_name: "lname",
    password: "password123"
  }

  it("Table should have an index method", () => {
    expect(Table.index).toBeDefined()
  })

  it("Table should have a show method", () => {
    expect(Table.show).toBeDefined()
  })

  it("Table should have a create method", () => {
    expect(Table.create).toBeDefined()
  })

  it("Table should have a remove method", () => {
    expect(Table.delete).toBeDefined()
  })

  it("Table should have a update method", () => {
    expect(Table.update).toBeDefined()
  })

  it("Table should have a authenticate method", () => {
    expect(Table.authenticate).toBeDefined()
  })

  it("Table create method should create a user", async () => {
    try{
      const newUser: User = await Table.create(user)

      expect({id:newUser.id, username:newUser.username, 
          first_name:newUser.first_name, last_name:newUser.last_name})
      .toEqual({id:newUser.id, 
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
       });
      expect(bcrypt.compareSync(`${user.password}${PEPPER}`, newUser.password)).toBe(true)


      const id = newUser.id as unknown as number;

      await Table.delete(id)
    }catch(err){
      throw new Error(`${err}`)
    }
  })

  it("Table show method should return the correct users", async () => {
    try{
      const newUser: User = await Table.create(user)

      const retrieved = await Table.show(newUser.id as unknown as number)

      expect(retrieved).toEqual(newUser)

      await Table.delete(newUser.id as unknown as number)
    }catch(err){
      throw new Error(`${err}`)
    }
  })

  it("Table remove method should remove the user", async () => {
    try{
      const newUser: User = await Table.create(user)

      await Table.delete(newUser.id as unknown as number)

      const list = await Table.index()

      expect(list).toEqual([])
    }catch(err){
      throw new Error(`${err}`)
    }
  })

  it("Table update method should update the user", async () => {
    try{
      const newUser: User = await Table.create(user)
      const newData: User = {
          username: 'customer',
          first_name: 'test1',
          last_name: 'test2',
          password: 'testpass'
      }

      const retreived = await Table.update({id: newUser.id, ...newData})    

      expect({first_name: newData.first_name,
          last_name: newData.last_name
      })
      .toEqual({first_name: retreived.first_name,
          last_name: retreived.last_name})

      expect(bcrypt.compareSync(`${newData.password}${PEPPER}`, retreived.password)).toBe(true)

      await Table.delete(newUser.id as unknown as number)
    }catch(err){
      throw new Error(`${err}`)
    }
  })

  it("Table authenticate must return null when invalid user", async () => {
    try{
      const authenticated: boolean = await Table.authenticate(user.username, user.password)

      expect(authenticated).toBe(false);
    }catch(err){
      throw new Error(`${err}`)
    }
  })

})
