"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRouter = void 0;
const express_1 = __importDefault(require("express"));
const borrow_model_1 = require("../models/borrow.model");
const book_model_1 = require("../models/book.model");
exports.borrowRouter = express_1.default.Router();
exports.borrowRouter.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity, dueDate } = req.body;
        if (!book || !quantity || !dueDate) {
            return res
                .status(400)
                .json({ success: false, message: 'Missing required fields' });
        }
        const foundBook = yield book_model_1.Book.findById(book);
        if (!foundBook) {
            return res
                .status(404)
                .json({ success: false, message: 'Book not found' });
        }
        if (foundBook.copies < quantity) {
            return res
                .status(400)
                .json({ success: false, message: 'Not enough copies available' });
        }
        foundBook.copies -= quantity;
        yield foundBook.save();
        yield book_model_1.Book.updateAvailability(foundBook._id);
        yield borrow_model_1.Borrow.create({ book, quantity, dueDate });
        const borrowedBook = yield book_model_1.Book.findById(foundBook._id);
        res.status(201).json({
            success: true,
            message: 'Book borrowed successfully',
            data: borrowedBook,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error,
        });
    }
}));
exports.borrowRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.Borrow.aggregate([
            {
                $group: {
                    _id: '$book',
                    totalQuantity: { $sum: '$quantity' },
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error,
        });
    }
}));
