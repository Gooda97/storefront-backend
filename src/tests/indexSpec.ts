import supertest from "supertest";
import { idText } from "typescript";
import app from "../index";

const request = supertest(app);

describe('Test the endpoints', ()=> {
    it('Get the / end point', async()=> {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    })
})