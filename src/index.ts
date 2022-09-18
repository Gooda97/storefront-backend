import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import users_routes from './handlers/user'
import product_routes from './handlers/product'
import orders_routes from './handlers/order'

//seerver instance
let app = express();

dotenv.config();
const {PORT} = process.env;

app.use(express.json());

const port = PORT || 3000;
app.listen(port, () =>{
    console.log(`Server started at port ${port}`);
});

users_routes(app);
product_routes(app);
orders_routes(app);

app.get('/', (req: Request, res: Response)=> {
    res.json({
        message: "Server started"
    })
})

export default app;