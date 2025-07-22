import express, {Application, Request, Response} from 'express';
import {bookRouter} from './app/controllers/book.controller';

const app: Application = express();
app.use(express.json());
app.use('/api', bookRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Library Management Api');
});
export default app;
