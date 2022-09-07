import express, {Request, Response} from 'express';
import {User, user_table} from '../models/user';
import { Secret } from 'jsonwebtoken';
const {
  PEPPER,
  TOKEN_SECRET
} = process.env;

const jwt = require('jsonwebtoken')

const table = new user_table();

const index = async(_req: Request, res:Response) => 
{
  const users = await table.index();
  res.json(users);
}

const show = async(_req: Request, res: Response) => 
{
  const user = await table.show(_req.params.id as unknown as number);
  res.json(user);
}

const create = async (_req: express.Request, res: express.Response) => {
  const user:User = {
    username: _req.body.username,
    first_name: _req.body.first_name,
    last_name: _req.body.last_name,
    password: _req.body.password
  }
  try {
    const newUser = await table.create(user);
    res.json({user: newUser});
  } catch(err) {
    res.json(err);
  }
}

const destroy = async (_req: Request, res: Response) => {
  const deleted = await table.delete(_req.params.id as unknown as number)
  res.json(deleted)
}

const authenticate = async (_req: Request, res: Response) => {
  const {username, password} = _req.body;
  try {
      const valid = await table.authenticate(username, password)
      var token = jwt.sign({ username: (username as string), valid: (valid as unknown as string) }, TOKEN_SECRET as unknown as Secret);
      if(!valid) {
        res.status(401);
        res.json({error: 'The username or the password is incorrect'})
      }
      else {
        res.json({message: 'Authintication success', token: token})
      }
  } catch(err) {
      res.status(401)
      res.json(err)
  }
}

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

const update = async (req: express.Request, res: express.Response) => {
    const user: User = {
        id: req.params.id as unknown as number,
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
    }

    try {
        const updated = await table.update(user)
        res.json(updated)
    } catch(err) {
        res.json(err)
    }
}

const users_routes = (app: express.Application) => {
  app.get('/users', checkAuth, index);
  app.get('/users/:id', checkAuth, show);
  app.post('/users/create', checkAuth, create);
  app.delete('/users/:id', checkAuth, destroy);
  app.put("/users/:id", checkAuth, update)
  app.post('/users/authenticate', authenticate);
};

export default users_routes;
