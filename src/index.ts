import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import users_routes from './handlers/user'

//seerver instance
let app = express();

dotenv.config();
const {PORT} = process.env;

app.use(express.json());

const port = PORT
app.listen(port, () =>{
    console.log(`Server started at port ${port}`);
});

users_routes(app);

app.get('/', (req: Request, res: Response)=> {
    res.json({
        message: "Server started"
    })
})

export default app;