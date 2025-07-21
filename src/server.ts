import express, {Request, Response} from 'express';
import 'dotenv/config';
const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Server is up and running');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});
