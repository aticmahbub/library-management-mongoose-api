import {model, Schema} from 'mongoose';
import {IBook} from '../interfaces/book.interface';
const bookSchema = new Schema<IBook>({
    title: {type: String, required: true, trim: true},
    author: {type: String, required: true},
    genre: {
        type: String,
        enum: [
            'FICTION',
            'NON_FICTION',
            'SCIENCE',
            'HISTORY',
            'BIOGRAPHY',
            'FANTASY',
        ],
        required: true,
    },
    isbn: {type: String, required: true, unique: true},
    description: {type: String},
    copies: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: 'Copies must be a positive number',
        },
        min: [0, 'Value must be a non-negative integer'],
    },
    available: {type: Boolean, default: true},
});

export const Book = model<IBook>('Book', bookSchema);
