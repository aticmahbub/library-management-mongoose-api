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
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },
    author: {
        type: String,
        required: [true, 'Author name is missing'],
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
        required: [true, 'ISBN is missing'],
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
bookSchema.statics.updateAvailability = function (bookId) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield this.findById(bookId);
        if (book) {
            book.available = book.copies > 0;
            yield book.save();
        }
    });
};
bookSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.description || !this.isModified('description')) {
            return next();
        }
        try {
            const hashedDescription = yield bcrypt_1.default.hash(this.description, 10);
            this.description = hashedDescription;
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
exports.Book = (0, mongoose_1.model)('Book', bookSchema);
