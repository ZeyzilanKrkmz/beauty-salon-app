import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();


const router=express.Router();

const AUTH_SERVICE_URL=process.env.AUTH_SERVICE_URL||"http://localhost:5001";

router.use(authMiddleware);
// const AUTH_BASE_URL = process.env.AUTH_SERVICE_URL || "http://localhost:5001";
// const authApi = axios.create({
//     baseURL:AUTH_BASE_URL,
//     timeout: 10000,
// });
// authApi.interceptors.request.use((cfg) => {
//     console.log("→ AUTH", cfg.method?.toUpperCase(), (cfg.baseURL || "") + (cfg.url || ""));
//     return cfg;
// });


router.get('/users',async(req,res,next)=>{
    try{
        const response=await axios.post(`${AUTH_SERVICE_URL}/auth/users`);
        res.json(response.data);


    }catch(err){
        next(err);
    }
});
router.post('/register',async(req,res,next)=>{
    try{
        const response=await axios.post(`${AUTH_SERVICE_URL}/auth/register`,req.body);
        res.json(response.data);


    }catch(err){
        next(err);
    }
});

router.post('/verify',async(req,res,next)=>{
    try{
        const response=await axios.post(`${AUTH_SERVICE_URL}/auth/verify`,req.body);
        res.json(response.data);
    }catch(err){
        next(err);
    }
});
router.post('/refresh-token',async(req,res,next)=>{
    try{
        const response=await axios.post(`${AUTH_SERVICE_URL}/auth/refresh-token`,req.body);
        res.json(response.data);
    }catch(err){
        next(err);
    }
});
router.post('/logout',async(req,res,next)=>{
    try{
        const response=await axios.post(`${AUTH_SERVICE_URL}/auth/logout`,req.body);
        res.json(response.data);
    }catch(err){
        next(err);
    }
});
router.post('/forgot-password',async(req,res,next)=>{
    try{
        const response=await axios.post(`${AUTH_SERVICE_URL}/auth/forgot-password`,req.body);
        res.json(response.data);
    }catch(err){
        next(err);
    }
});
router.post('/verify-forgot-password',async(req,res,next)=>{
    try{
        const response=await axios.post(`${AUTH_SERVICE_URL}/auth/verify-forgot-password`,req.body);
        res.json(response.data);
    }catch(err){
        next(err);
    }
});
router.post('/reset-password',async(req,res,next)=>{
    try{
        const response=await axios.post(`${AUTH_SERVICE_URL}/auth/reset-password`,req.body);
        res.json(response.data);
    }catch(err){
        next(err);
    }
});
router.get('/user/:id',async(req,res,next)=>{
    try{
        const response=await axios.post(`${AUTH_SERVICE_URL}/auth/user/${req.params.id}`,req.body);
        res.json(response.data);
    }catch(err){
        next(err);
    }
});
router.put('/user/:id',async(req,res,next)=>{
    try{
        const response=await axios.post(`${AUTH_SERVICE_URL}/auth/user/${req.params.id}`,req.body);
        res.json(response.data);
    }catch(err){
        next(err);
    }
});
router.put('/user/:id/delete',async(req,res,next)=>{
    try{
        const response=await axios.post(`${AUTH_SERVICE_URL}/auth/user/${req.params.id}/delete`,req.body);
        res.json(response.data);
    }catch(err){
        next(err);
    }
});
router.post('/login',async(req,res,next)=>{
    try{
        const response=await axios.post(`${AUTH_SERVICE_URL}/auth/login`,req.body);
        res.json(response.data);
    }catch(err){
        next(err);
    }
});

// authApi.interceptors.request.use((cfg) => {
//     console.log("→ AUTH", cfg.method?.toUpperCase(), (cfg.baseURL || "") + (cfg.url || ""));
//     return cfg;
// });

export default router;