import express, {Request, Response} from 'express';
import dotenv from 'dotenv';


//seerver instance
let app = express();

dotenv.config();
const {PORT} = process.env;

app.use(express.json());

const port = PORT
app.listen(port, () =>{
    console.log(`Server started at port ${port}`);
});

app.get('/', (req: Request, res: Response)=> {
    res.json({
        message: "Server started"
    })
})

export default app;