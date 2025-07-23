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
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.bookRouter = express_1.default.Router();
exports.bookRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10', } = req.query;
        const query = {};
        if (filter) {
            query.genre = filter.toString().toUpperCase();
        }
        const sortOptions = {};
        sortOptions[sortBy.toString()] = sort === 'asc' ? 'asc' : 'desc';
        const books = yield book_model_1.Book.find(query)
            .sort(sortOptions)
            .limit(Number(limit));
        res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            data: books,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve books',
            error,
        });
    }
}));
exports.bookRouter.get('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield book_model_1.Book.findById(bookId);
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
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Invalid book ID',
            error,
        });
    }
}));
exports.bookRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const book = yield book_model_1.Book.create(body);
        console.log(book);
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: book,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to create book',
            error,
        });
    }
}));
exports.bookRouter.put('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const bookId = req.params.bookId;
        const book = yield book_model_1.Book.findByIdAndUpdate(bookId, body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: book,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to update book',
            error,
        });
    }
}));
exports.bookRouter.delete('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield book_model_1.Book.findByIdAndDelete(bookId);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found or already deleted',
            });
        }
        const checkDeleted = yield book_model_1.Book.findById(bookId);
        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: checkDeleted,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to delete book',
            error,
        });
    }
}));
