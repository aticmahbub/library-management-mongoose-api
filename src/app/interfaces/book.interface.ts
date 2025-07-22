import {Model, Types} from 'mongoose';
import {Document} from 'mongoose';

export interface IBook extends Document {
    title: string;
    author: string;
    genre:
        | 'FICTION'
        | 'NON_FICTION'
        | 'SCIENCE'
        | 'HISTORY'
        | 'BIOGRAPHY'
        | 'FANTASY';
    isbn: string;
    description: string;
    copies: number;
    available: boolean;
}

export interface BookModel extends Model<IBook> {
    updateAvailability(bookId: string | Types.ObjectId): Promise<void>;
}
