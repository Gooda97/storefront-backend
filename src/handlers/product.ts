import express, {Request, Response} from 'express';
import { product, store } from '../models/product';

const Store = new store();

const index = async (_req: Request, res: Response) => {
  const list = await Store.index();
  res.json(list);
};

const show = async (_req: Request, res: Response) => {
  const prod = await Store.show(_req.params.id as unknown as number)
  res.json(prod)
}

const create = async (_req: Request, res: Response) => {
    const prod:product = {
      product_name: _req.body.product_name,
      price: _req.body.price
    }
    try {
      const newUser = await Store.create(prod);
      res.json(newUser);
    } catch(err) {
      res.json(err);
    }
  }
// const create = async(_req: Request, res: Response) => {
//   const prod: product = {
//     product_name: _req.body.product_name,
//     product_type: _req.body.product_type,
//     price: _req.body.price
//   }
//   try {
//     const newProduct = await Store.create(prod);
//     res.json(newProduct);
//   } catch (err) {
//     res.json(err);
//   }
// }

const destroy = async (req: Request, res: Response) => {
  try{
    const deleted = await Store.delete(req.params.id as unknown as number);
    res.json(deleted);
  } catch (error) {
    res.json({error});
  }
} 

const update = async (req: Request, res: Response) => {
  const prod: product = {
      id: req.params.id as unknown as number,
      product_name: req.body.product_name,
      price: req.body.price,
  }
  try {
      const updated = await Store.update(prod)
      res.json(updated)
  } catch(err) {
      res.status(400)
      res.json(err)
  }
}

const product_routes = (app: express.Application) => {
  app.get('/products', index) 
  app.get('/products/:id', show) 
  app.post('/products/create' ,create)
  app.put('/products/:id', update)
  app.delete('/products/:id', destroy)
};

export default product_routes;
