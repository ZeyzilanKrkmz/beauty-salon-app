import { Router, Request, Response } from "express";
import multer from "multer";
import express from 'express';
import path from "path";
import fs from "fs";
import bcrypt from "bcrypt";
import { pbkdf2Sync, randomBytes } from "crypto";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import {generateSalt,hashPassword,verifyPassword} from "../utils/password";
import { generateAccessToken, generateRefreshToken } from "../utils/token";


const router=express.Router();

const uploadDir=path.join(__dirname,'..','uploads');

if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}
const storage=multer.diskStorage({
    destination:(_req,_file,cb)=>cb(null,uploadDir),
        filename:(_req,file,cb)=>{
        const uniqueSuffix=Date.now()+'-'+Math.round(Math.random()*1E9);
        const ext=path.extname(file.originalname);
        cb(null,file.fieldname+'-'+uniqueSuffix+ext);

    }
});

const upload=multer({storage});

const generateVerificationCode=()=>{
    return Math.floor(100000+Math.random()*900000).toString();
}

router.post('/register',upload.single('photo'),async(req,res)=>{
    try{

        const {email,password,fullName,phone,profession,birthDate,gender,role}=req.body as {email?:string,password?:string,fullName:string,phone:string,profession:string,birthDate:Date,gender:string,role:string};

        const pwd = req.body?.password;
        if (typeof pwd !== "string" || !pwd.trim()) {
            return res.status(400).json({ message: "password is required" });
        }
        if(await User.findOne({email})){
           res.status(400).json({message:'email already exists'});
           return;
        }

        const salt=generateSalt();
        const passwordHash=hashPassword(pwd,salt);
        const verificationCode=generateVerificationCode();
        const expires=new Date( Date.now()+15*60*1000);

        const photoUrl=req.file? req.file.filename:gender=='male'?'male.jpg':'female.jpg';

        const user=new User({
            email,
            passwordHash,
            passwordSalt:salt,
            fullName,
            phone,
            profession,
            birthDate:birthDate ? new Date(birthDate):undefined,
            gender,
            role,
            photoUrl,
            verificationCode,
            verificationCodeExpires:expires
        });
        res.status(201).json({
            message:'registration successful',
            user:{
                id:user._id,
                email:user.email,
                fullName:user.fullName,
                phone:user.phone,
                profession:user.profession,
                birthDate:user.birthDate,
                photoUrl:user.photoUrl

            },verificationCode
        });

    }catch(err){
        console.error(err);
        res.status(500).json({message:'Registration failed...'})
    }




});

router.post('/verify',async(req,res)=>{
    const {email,code}=req.body;
    try{

        const user=await User.findOne({email});

        if(!user){
            return res.status(404).json({message:'user not found'});

        }
        if(user.isVerified){
            return res.status(400).json({message:'user already verified'});

        }

        if(user.verificationCode!==code||new Date()>(user.verificationCodeExpires??new Date()))
        {
            return  res.status(400).json({message:'ınvalid or expired code'});

        }
        user.isVerified=true;
        user.verificationCode=undefined;
        user.verificationCodeExpires=undefined;
        await user.save();

        const token=generateAccessToken({id: user._id.toString(), role: user.role});

        const refreshToken=generateRefreshToken({id:user._id.toString()});
        user.refreshToken=refreshToken;


        res.status(200).json({token,refreshToken});

}catch(err){
        console.error(err);
        res.status(500).json({message:'verification failed...'});
    }




});

export default router;