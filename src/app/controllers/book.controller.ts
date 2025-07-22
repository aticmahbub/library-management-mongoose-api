import express, {Request, Response} from 'express';
import {Book} from '../models/book.model';
import {SortOrder} from 'mongoose';

export const bookRouter = express.Router();

bookRouter.get('/', async (req: Request, res: Response) => {
    try {
        const {
            filter,
            sortBy = 'createdAt',
            sort = 'desc',
            limit = '10',
        } = req.query;

        const query: Record<string, unknown> = {};
        if (filter) {
            query.genre = filter.toString().toUpperCase();
        }

        const sortOptions: {[key: string]: SortOrder} = {};
        sortOptions[sortBy.toString()] = sort === 'asc' ? 'asc' : 'desc';

        const books = await Book.find(query)
            .sort(sortOptions)
            .limit(Number(limit));

        res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            data: books,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve books',
            error,
        });
    }
});

bookRouter.get('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Book retrieved successfully',
            data: book,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Invalid book ID',
            error,
        });
    }
});
bookRouter.post('/', async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const book = await Book.create(body);
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: book,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to create book',
            error,
        });
    }
});

bookRouter.put('/:bookId', async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const bookId = req.params.bookId;
        const book = await Book.findByIdAndUpdate(bookId, body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: book,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to update book',
            error,
        });
    }
});
bookRouter.delete('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const book = await Book.findByIdAndDelete(bookId);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found or already deleted',
            });
        }
        const checkDeleted = await Book.findById(bookId);

        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: checkDeleted,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to delete book',
            error,
        });
    }
});
