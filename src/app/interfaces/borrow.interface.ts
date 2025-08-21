import {Types} from 'mongoose';

export interface IBorrow {
    id: Types.ObjectId;
    quantity: number;
    dueDate: Date;
}
