import express, {Request, Response} from 'express';
import {Borrow} from '../models/borrow.model';
import {Book} from '../models/book.model';
import {Types} from 'mongoose';
export const borrowRouter = express.Router();

borrowRouter.put('/', async (req: Request, res: Response) => {
    try {
        const {id, quantity, dueDate} = req.body;
        if (!id || !quantity || !dueDate) {
            return res
                .status(400)
                .json({success: false, message: 'Missing required fields'});
        }

        const book = await Book.findById(id);
        if (!book) {
            return res
                .status(404)
                .json({success: false, message: 'Book not found'});
        }

        if (book.copies < quantity) {
            return res
                .status(400)
                .json({success: false, message: 'Not enough copies available'});
        }

        book.copies -= quantity;
        await book.save();

        await Book.updateAvailability(book._id as Types.ObjectId);

        await Borrow.create({book: book._id, quantity, dueDate});
        const borrowedBook = await Book.findById(book._id);

        res.status(201).json({
            success: true,
            message: 'Book borrowed successfully',
            data: borrowedBook,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error,
        });
    }
});

borrowRouter.get('/', async (req: Request, res: Response) => {
    try {
        const summary = await Borrow.aggregate([
            {
                $group: {
                    _id: '$book',
                    totalQuantity: {$sum: '$quantity'},
                },
            },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'bookInfo',
                },
            },
            {
                $unwind: '$bookInfo',
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: '$bookInfo.title',
                        isbn: '$bookInfo.isbn',
                    },
                    totalQuantity: 1,
                },
            },
        ]);

        res.status(200).json({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            data: summary,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error,
        });
    }
});
