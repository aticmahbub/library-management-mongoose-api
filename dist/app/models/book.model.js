"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Title is must'],
        trim: true,
    },
    author: {
        type: String,
        required: [true, 'Author name is needed'],
    },
    genre: {
        type: String,
        enum: {
            values: [
                'FICTION',
                'NON_FICTION',
                'SCIENCE',
                'HISTORY',
                'BIOGRAPHY',
                'FANTASY',
            ],
            message: 'Genre must be FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY',
        },
        required: [true, 'Genre is required'],
    },
    isbn: {
        type: String,
        required: [true, 'ISBN is required'],
        unique: true,
    },
    description: {
        type: String,
    },
    copies: {
        type: Number,
        required: [true, 'Copies is required'],
        min: [0, 'Number of copies must be a positive number'],
    },
    available: {
        type: Boolean,
        default: true,
    },
}, { versionKey: false, timestamps: true });
exports.Book = (0, mongoose_1.model)('Book', bookSchema);
