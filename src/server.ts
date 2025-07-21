// import express, {Request, Response} from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app';

// let server: Server;
async function main() {
    try {
        await mongoose.connect(`${process.env.URI}`);
        console.log('connected to mongodb using mongoose');
        app.listen(process.env.PORT, () => {
            console.log(`Server is listening on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

main();
