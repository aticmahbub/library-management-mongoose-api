import {model, Schema} from 'mongoose';
import {IBorrow} from '../interfaces/borrow.interface';

const borrowSchema = new Schema<IBorrow>(
    {
        id: {
            type: Schema.Types.ObjectId,
            ref: 'Book',
            required: true,
        },
        quantity: {
            type: Number,
            required: [true, 'Quantity is required'],
            min: [1, 'Quantity must be at least 1'],
            validate: {
                validator: Number.isInteger,
                message: 'Quantity must be an integer',
            },
        },
        dueDate: {
            type: Date,
            required: [true, 'Due date is required'],
            validate: {
                validator: function (value: Date) {
                    return value > new Date();
                },
                message: 'Due date must be a future date',
            },
        },
    },
    {timestamps: true, versionKey: false},
);

export const Borrow = model<IBorrow>('Borrow', borrowSchema);
