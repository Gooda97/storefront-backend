import { order, orderClass } from "../models/order"
import { User, user_table } from "../models/user"
import { product, store } from "../models/product"

const ordersClass = new orderClass()
const Table = new user_table()
const Store = new store()

describe("Order Model", () => {
    let user_id: number, product_id: number, ord: order

    beforeAll(async function createUser() {
        try{
            const user: User = await Table.create({
                username: "customer",
                first_name: "fname",
                last_name: "lname",
                password: "password123"
            })
    
    
            user_id = user.id as number;
            const prod: product= {
                product_name: "prod_test",
                price: 100
            }
            const createdProduct: product = await Store.create(prod)
            product_id = createdProduct.id as number
    
            ord = {
                products: [{
                product_id,
                quantity: 5
                }],
                user_id: user_id
            }
        }catch(err){
            throw new Error(`${err}`)
        }
    });

    

    it("index method defined", () => {
        expect(ordersClass.index).toBeDefined()
    });

    it("show method defined", () => {
        expect(ordersClass.show).toBeDefined()
    });

    it("add method defined", () => {
        expect(ordersClass.create).toBeDefined()
    });

    it("delete method defined", () => {
        expect(ordersClass.delete).toBeDefined()
    });

    it("update method defined", () => {
        expect(ordersClass.update).toBeDefined()
    });

    it("orders index method should return a list of orders", async () => {
        try{
            const list = await ordersClass.index()
            expect(list).toEqual([])
        }catch(err){
            throw new Error(`${err}`)
        }
    });

    it("orders add method should add a new order", async () => {
        try{
            const createdOrder: order = await ordersClass.create(ord)

            expect(createdOrder).toEqual({
                id: createdOrder.id,
                ...ord
            })
            const id = createdOrder.id as number
            await ordersClass.delete(id)
        } catch(err){
            throw new Error(`${err}`)
        }
    });

    it("orders show method should return the correct orders", async () => {
        try{
            const createdOrder: order = await ordersClass.create(ord)
        
            const id = createdOrder.id as number
            const retrieved = await ordersClass.show(id)

            expect({id:retrieved.id, user_id:retrieved.user_id}).toEqual({id:id, user_id:createdOrder.user_id})

            await ordersClass.delete(id)
        }catch(err){
            throw new Error(`${err}`)
        }
    });

    it("orders update method should update the order", async () => {
        try{
            const createdOrder: order = await ordersClass.create(ord)
            const id = createdOrder.id as number

            const newOrder: order = {
            id: id,
            products: [{
                product_id,
                quantity: 10
            }],
            user_id: user_id
            }

            const {products} = await ordersClass.update(newOrder)

            expect(products).toEqual(newOrder.products)

            await ordersClass.delete(id)
        }catch(err){
            throw new Error(`${err}`)
        }
    });

    it("orders delete method should remove the order", async () => {
        try{
            const createdOrder: order = await ordersClass.create(ord)

            const id = createdOrder.id as number

            await ordersClass.delete(id)

            const orderList = await ordersClass.index()

            expect(orderList).toEqual([])

            await Table.deleteAll()
            await Store.delete(product_id);
        } catch(err){
            throw new Error(`${err}`)
        }
    });  

    
})
