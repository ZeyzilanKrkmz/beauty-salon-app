import express, { Request, Response } from "express";
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/auth';
import mongoose from 'mongoose';

const app=express();
dotenv.config({path:'./.env'});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use('/auth',authRoutes);


mongoose
    .connect(process.env.MONGO_URI!)
    .then(()=>{
        console.log('Connected to MongoDB');
        app.listen(process.env.PORT||3005,()=>{
            console.log(`server is running on port ${process.env.PORT}`);
    });
    })
    .catch((err)=>{
        console.error('failed to connect to MongoDB',err);
});