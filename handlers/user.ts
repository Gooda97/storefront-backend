import express, {Request, Response} from 'express';
import {User, user_table} from '../src/models/user';

const table = new user_table();

const index = async(_req: Request, res:Response) => 
{
  const users = await table.index();
  res.json(users);
}

const show = async(_req:express.Request, res:express.Response) => 
{
  const user = await table.show(_req.body.id);
  res.json(user);
}

const create = async (_req: express.Request, res: express.Response) => {
  const user:User = {
    username: _req.body.username,
    password_digest: _req.body.password_digest
  }
  try {
    const newUser = await table.create(user);
    var token = jwt.sign({ user: newUser }, secret);
    res.json(token)
  } catch(err) {
    res.status(400);
    res.json(err);
  }
}

const destroy = async (_req: express.Request, res: express.Response) => {
  const deleted = await table.delete(_req.body.id)
  res.json(deleted)
}

const authenticate = async (_req: express.Request, res: express.Response) => {
  const user: User = {
    username: _req.body.username,
    password_digest: _req.body.password_digest,
  }
  try {
      const u = await table.authenticate(user.username, user.password_digest as string)
      var token = jwt.sign({ user: u }, secret);
      res.json(token)
  } catch(err) {
      res.status(401)
      res.json(err)
  }
}

function checkAuthHeader (req: express.Request, res: express.Response, next: express.NextFunction): void | boolean {
  if (!req.headers.authorization) {
    res.status(401)
    res.json("Invalid token")
    return false
  }

  try {
    const token = req.headers.authorization.split(" ")[1] 
    jwt.verify(token, secret)

    next()
  } catch (err) {
    console.error(err)

    res.status(401)
    res.json("Invalid token")

    return false
  }
}

const update = async (req: express.Request, res: express.Response) => {
    const user: User = {
        id: parseInt(req.params.id),
        username: req.body.username,
        password_digest: req.body.password_digest,
    }

    try {
        const updated = await table.create(user)
        res.json(updated)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const users_routes = (app: express.Application) => {
  app.get('/users', checkAuthHeader, index);
  app.get('/users/{:id}', show);
  app.post('/users/create', create);
  app.delete('/users', destroy);
  app.put("/users/{:id}", checkAuthHeader, update)
  app.post('/users/authenticate', authenticate);
};

export default users_routes;
