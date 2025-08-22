import cors from 'cors';
import express, {Application, Request, Response} from 'express';
import {bookRouter} from './app/controllers/book.controller';
import {borrowRouter} from './app/controllers/borrow.controller';

const app: Application = express();
app.use(express.json());
app.use(
    cors({
        origin: [
            'http://localhost:5173',
            'https://library-management-redux-toolkit.vercel.app/',
        ],
    }),
);
app.use('/api/books', bookRouter);
app.use('/api/borrow', borrowRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Library Management Api');
});
export default app;
