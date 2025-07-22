import {model, Schema} from 'mongoose';
import {BookModel, IBook} from '../interfaces/book.interface';
const bookSchema = new Schema<IBook, BookModel>(
    {
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
                message:
                    'Genre must be FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY',
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
    },
    {versionKey: false, timestamps: true},
);
bookSchema.statics.updateAvailability = async function (bookId) {
    const book = await this.findById(bookId);
    if (book) {
        book.available = book.copies > 0;
        await book.save();
    }
};

export const Book = model<IBook, BookModel>('Book', bookSchema);
