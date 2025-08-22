
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import {errorHandler} from "./middlewares/errorHandler";
import {responseWrapper} from "./middlewares/responseWrapper";


const app=express();

app.use(cors());
app.use(express.json());
app.use(responseWrapper);
app.use('/auth',authRoutes);
app.use(errorHandler);
app.use("/api",authRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`gateway is running on port ${process.env.PORT}`);
});