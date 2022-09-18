"use strict";
// import supertest from 'supertest';
// import client from '../database';
// import {User, user_table} from '../models/user';
// import app from '..';
// import bcrypt from 'bcrypt'
// const table = new user_table();
// const request = supertest(app);
// let token = '';
// const {PEPPER} = process.env;
// describe('User API Endpoints', () => {
//   const user: User = {
//     username: 'test1',
//     first_name: 'test_f',
//     last_name: 'test_l',
//     password: 'pass123',
//   };
//   (async () => {
//     const newUser = await table.create(user);
//     user.id = newUser.id;
//   })();
//   describe('Test Authenticate methods', () => {
//     it('authinticate success', async () => {
//       const res = await request
//         .post('/users/authenticate')
//         .send({
//           username: user.username,
//           password: user.password,
//         });
//       expect(res.status).toBe(200);
//       const { message, token: gettoken } = res.body.data;
//       expect(message).toBe('Authintication success');
//       token = gettoken;
//     });
//     it('unauthorized access', async () => {
//       const res = await request
//         .post('/users/authenticate')
//         .send({
//           username: user.username,
//           password: 'test123',
//         });
//       expect(res.status).toBe(401);
//       expect(res.body.data.message).toBe('Unauthorized access denied')
//     });
//   });
//   describe('Routes', () => {
//     it('create', async () => {
//       const res = await request
//         .post('/users/create')
//         .send({
//           username: 'test2',
//           first_name: 'test_f2',
//           last_name: 'test_l2',
//           password: 'test123',
//         });
//       expect(res.status).toBe(200);
//       const { username, first_name, last_name } = res.body.data;
//       expect(username).toBe('test2');
//       expect(first_name).toBe('test_f2');
//       expect(last_name).toBe('test_l2');
//     });
//     it('index', async () => {
//       const res = await request
//         .get('/users/')
//         .set('Authorization', `Bearer ${token}`);
//       expect(res.status).toBe(200);
//       expect(res.body.data.length).toBe(2);
//     });
//     it('show', async () => {
//       const res = await request
//         .get(`/users/${user.id}`)
//         .set('Authorization', `Bearer ${token}`);
//       expect(res.status).toBe(200);
//       expect(res.body.data.username).toBe(user.username);
//     });
//     it('update', async () => {
//       const res = await request
//         .put(`users/${user.id}`)
//         .set('Authorization', `Bearer ${token}`)
//         .send({
//           first_name: 'f1',
//           last_name: 'l1',
//           password: 'pass'
//         });
//       expect(res.status).toBe(200);
//       const { id, username, first_name, last_name, password } = res.body.data;
//       expect(id).toBe(user.id);
//       expect(username).toBe(user.username);
//       expect(first_name).toBe('f1');
//       expect(last_name).toBe('l1');
//       expect(bcrypt.compareSync(`pass${PEPPER}`, password)).toBe(true)
//     });
//     it('delete', async () => {
//       const res = await request
//         .delete(`/users/${user.id}`)
//         .set('Authorization', `Bearer ${token}`);
//       expect(res.status).toBe(200);
//       expect(res.body.data.id).toBe(user.id);
//       expect(res.body.data.user_name).toBe(user.username);
//     });
//   });
//   (async () => {
//     const connection = await client.connect();
//     const sql = 'DELETE FROM users;';
//     await connection.query(sql);
//     connection.release();
//   })();
// });
// //----------------------------------------------------------
// // import supertest from "supertest"
// // import app from "../index"
// // import { User, user_table } from "../models/user"
// // const Table = new user_table();
// // const test = supertest(app);
// // let user: User = {
// //     username: "test",
// //     first_name: "fname",
// //     last_name: "lname",
// //     password: "123"
// // };
// // let newuser: User;
// // let id: number;
// // beforeAll (async () =>{
// //     newuser = await Table.create(user);
// //     id = newuser.id as unknown as number;
// // });
// //   let token: string;
// //   it("authorization", () => {
// //     test.get("/users").then((res) => {
// //       expect(res.status).toBe(401)
// //     })
// //     test.get(`/users/${id}`).then((res) => {
// //       expect(res.status).toBe(401)
// //     })
// //     test.put(`/users/${id}`).send({
// //             username: 'test_user', first_name:"f", last_name: "l", password: "111"
// //         }).then((res) => {
// //       expect(res.status).toBe(401)
// //     })
// //     test.delete(`/users/${id}`).then((res) => {
// //       expect(res.status).toBe(401)
// //     })
// //   })
// //   it("authorization success", () => {
// //     test.post("/users/authenticate").send({username: user.username,
// //         password: user.password}).then((res) => {
// //         expect(res.status).toBe(200);
// //         expect(res.body.message).toBe("Authintication success");
// //         token = res.body.token;
// //         })
// //     })
// //     // it("authorization fail", () => {
// //     //     test.post("/users/authenticate").send({username: user.username,
// //     //         password: "122"}).then((res) => {
// //     //         expect(res.status).toBe(401);
// //     //         })
// //     // })
// //   it("index", () => {
// //     test.get("/users").set("Authorization", `bearer ${token}`).then((res) => {
// //       expect(res.status).toBe(200)
// //     })
// //   })
// //   it("show", () => {
// //     test.get(`/users/${id}`).set("Authorization", `bearer ${token}`).then((res) => {
// //       expect(res.status).toBe(200)
// //     })
// //   })
// //   it("update", () => {
// //     const newuser: User = {
// //       username: 'test11',
// //       first_name: 'f1',
// //       last_name: 'l1',
// //       password: 'pass1'
// //     }
// //     test.put(`/users/${id}`).send(newuser).set("Authorization", `bearer ${token}`).then((res) => {
// //       expect(res.status).toBe(200)
// //     })
// //   })
// //   it("delete", () => {
// //     test.delete(`/users/${id}`).set("Authorization", `bearer ${token}`).then((res) => {
// //       expect(res.status).toBe(200)
// //     })
// //   })
// //   afterAll (async () =>{
// //     await Table.delete(id);
// // });
