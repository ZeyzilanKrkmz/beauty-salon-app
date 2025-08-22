import {Request,Response,NextFunction} from "express";

export function responseWrapper(req:Request,res:Response,next:NextFunction){
    const originalJson=res.json;

    res.json=function(data:any){
        const statusCode=res.statusCode;

        if(statusCode>=400){
            return originalJson.call(this,data);
        }
        if(data && typeof data==='object' && 'data' &&'errors' in data){
            return originalJson.call(this,data);
        }
        return originalJson.call(this,{
            data,
            errors:[],
        });
    }

    next();

}