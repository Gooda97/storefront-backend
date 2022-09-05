import express, {Request, Response} from 'express';
import {User, user_table} from '../models/user';

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

// const authenticate = async (_req: express.Request, res: express.Response) => {
//   const user: User = {
//     username: _req.body.username,
//   }
//   try {
//       const u = await table.authenticate(user.username, user.password_digest as string)
//       var token = jwt.sign({ user: u }, secret);
//       res.json(token)
//   } catch(err) {
//       res.status(401)
//       res.json(err)
//   }
// }

// function checkAuthHeader (req: express.Request, res: express.Response, next: express.NextFunction): void | boolean {
//   if (!req.headers.authorization) {
//     res.status(401)
//     res.json("Invalid token")
//     return false
//   }

//   try {
//     const token = req.headers.authorization.split(" ")[1] 
//     jwt.verify(token, secret)

//     next()
//   } catch (err) {
//     console.error(err)

//     res.status(401)
//     res.json("Invalid token")

//     return false
//   }
// }

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
        res.status(400)
        res.json(err)
    }
}

const users_routes = (app: express.Application) => {
  app.get('/users', index);
  app.get('/users/:id', show);
  app.post('/users/create', create);
  app.delete('/users/:id', destroy);
  app.put("/users/:id", update)
  // app.post('/users/authenticate', authenticate);
};

export default users_routes;
