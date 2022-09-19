import supertest from "supertest";

import app from "../index";

const request = supertest(app);

describe('Test the endpoints', ()=> {
    it('Get the / end point', async()=> {
        try{
            const response = await request.get('/');
            expect(response.status).toBe(200);
        }catch(err){
            throw new Error(`${err}`)
        }
    })
})