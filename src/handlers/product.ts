import express, {Request, Response} from 'express';
import { product, store } from '../models/product';
import {Secret}  from 'jsonwebtoken';

const jwt = require('jsonwebtoken');

const {
  TOKEN_SECRET
} = process.env;

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

function checkAuth (req: Request, res: Response, next: express.NextFunction): void | boolean {
  if (!req.headers.authorization) {
    res.status(401)
    res.json({message: "Unauthorized access denied"})
    return false
  }
  try {
    const token = req.headers.authorization.split(" ")[1] 
    if(jwt.verify(token, TOKEN_SECRET as unknown as Secret)) {
      next();
    }
    else{
      res.status(401);
      res.json({message: "Unauthorized access denied"});
      return false;
    }
  } catch (err) {
    console.error(err)
    res.status(401)
    return false
  }
}

const product_routes = (app: express.Application) => {
  app.get('/products', index) 
  app.get('/products/:id', checkAuth, show) 
  app.post('/products/create' , checkAuth,create)
  app.put('/products/:id', checkAuth, update)
  app.delete('/products/:id', checkAuth, destroy)
};

export default product_routes;
