import { Request,Response,NextFunction } from "express";
import {jwt} from "jsonwebtoken";


export interface AuthRequest extends Request{
    user?:any
}

export function authNiddleware(req:AuthRequest,res:Response,next:NextFunction){

    const authHeader=req.headers.authorization;
    if(!authHeader){
        return  next({status:401,message:"unauthorized"});s
    }
    const token=authHeader.split(" ")[1];
    if(!token){
        return  next({status:401,message:"unauthorized"});
    }
    try{
        const payload=jwt.verify(token,process.env.JWT_SECRET!);
        req.user=payload;
        next();

    }catch(error){
        next({status:401,message:"unauthorized"});
    }
}