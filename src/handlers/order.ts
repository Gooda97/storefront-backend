import express, {Request, Response} from 'express';
import { order, ordreClass } from '../models/order';
import {Secret}  from 'jsonwebtoken';
import client from '../database';

const jwt = require('jsonwebtoken');

const OrderClass = new ordreClass();

const {
  TOKEN_SECRET
} = process.env;

const index = async (_req: Request, res: Response) => {
  const list = await OrderClass.index();
  res.json(list);
};

const show = async (_req: Request, res: Response) => {
  const prod = await OrderClass.show(_req.body.id)
  res.json(prod)
};


function checkAuth (req: Request, res: Response, next: express.NextFunction): void | boolean {
    if (!req.headers.authorization) {
      res.status(401)
      res.json("Unauthorized access denied")
      return false
    }
    try {
      const token = req.headers.authorization.split(" ")[1] 
      if(jwt.verify(token, TOKEN_SECRET as unknown as Secret)) {
        next();
      }
      else{
        res.status(401);
        res.json("Unauthorized access denied");
        return false;
      }
    } catch (err) {
      console.error(err)
      res.status(401)
      return false
    }
  }
  
const update = async (req: Request, res: Response) => {
  const ord: order = {
      id: req.params.id as unknown as number,
      products: req.body.products,
      user_id: req.body.user_id
  }
  try {
      const updated = await OrderClass.update(ord)
      res.json(updated)
  } catch(err) {
      res.status(400)
      res.json(err)
  }
}

const destroy = async (req: Request, res:Response) => {
    const id: number = parseInt(req.params.id);
    try {
        const result = await OrderClass.delete(id);
        return res.json({result})    
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const products_routes = (app: express.Application) => {
  app.get('/orders', index)
  app.get('/orders/:id', checkAuth, show)
//   app.post('/orders/create',checkAuth ,create)
  app.put('/orders/:id',checkAuth, update)
  app.delete('/orders/:id',checkAuth, destroy)
};

export default products_routes;
