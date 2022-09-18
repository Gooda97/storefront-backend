import { product, store } from '../models/product';

const Store = new store();

describe('product model', () => {
  const prod: product = {
    product_name: 'test',
    price: 1000
  }

  it('store should have an index method', () => {
    expect(Store.index).toBeDefined();
  });

  it("store should have a show method", () => {
    expect(Store.show).toBeDefined()
  })

  it("store should have a create method", () => {
    expect(Store.create).toBeDefined()
  })

  it("store should have a delete method", () => {
    expect(Store.delete).toBeDefined()
  })

  it("store should have a update method", () => {
    expect(Store.update).toBeDefined()
  })

  it('store index should return a list of products', async () => {
    const res = await Store.index();
    expect(res).toEqual([]);
  });

  it("store add should add a new product", async () => {
    const newProd: product = await Store.create(prod)

    expect(newProd).toEqual({
      id: newProd.id,
      product_name: newProd.product_name,
      price: newProd.price
    })
    const id = newProd.id as unknown as number
    await Store.delete(id)
  })

  it("store show should return the correct product", async () => {
    const newProd: product = await Store.create(prod)
    const id = newProd.id as unknown as number
    const retreived = await Store.show(id)

    expect(retreived).toEqual(newProd)

    await Store.delete(id)
  })

  it("store update method should update the product", async () => {
    const newProd: product = await Store.create(prod)
    const newData: product = {
      product_name: 'test2',
      price: 999
    }

    const id = newProd.id as unknown as number;

    const retrieved = await Store.update({id:id, ...newData});
    
    expect({id: retrieved.id, product_name: retrieved.product_name, price: parseInt(String(retrieved.price))})
    .toEqual({id:newData.id, product_name: newData.product_name, price:newData.price});

    await Store.delete(id)
  })

  it("Store remove method should remove the product", async () => {
    const newprod: product = await Store.create(prod)

    await Store.delete(newprod.id as unknown as number)

    const list = await Store.index()

    expect(list).toEqual([])
  })
});

