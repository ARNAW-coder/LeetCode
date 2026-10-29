import { redisClient } from "../config/redis.js";
import {User} from "../models/user.js";
import { validate } from "../utils/validator.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const register = async(req,res) =>{
    try{
        // validate the data 
        validate(req.body);

        const {firstName,emailId,password} = req.body;
        // email id aready exists kar rhi hai and again use email se doosra account bnaoge toh automatically error dedega
        
        req.body.password = await bcrypt.hash(password,10);
        req.body.role = "user";   // is wale path se agr koi bhi aayega toh voh as a user hi registered hoga

        const user = await User.create(req.body);
        
        const token = jwt.sign({_id:user._id,emailId:emailId,role:"user"},process.env.JWT_KEY,{expiresIn:3600});

        res.cookie("token",token,{maxAge:60*60*1000});

        res.status(201).send("user created successfully");
    }
    catch(error){
        console.log(error);
        res.status(500).send("Error: ",error);
    }
}

const login = async(req,res) =>{
    try {
        const {emailId,password} = req.body;

        if(!emailId || !password){
            throw new Error("Invalid credentials");
        }

        const  user = await User.findOne({emailId});

        const match = bcrypt.compare(password,user.password);
        

        if(!match){
            throw new Error("invalid credentials");
        }
        const token = jwt.sign({_id:user._id,emailId:emailId,role:user.role},process.env.JWT_KEY,{expiresIn:3600});

        res.cookie("token",token,{maxAge:60*60*1000}); /// ye milli second me hota hai
        res.status(200).send("user logged in succcessfully");

    } catch (error) {
        res.status(401).send("error: ",error);
    }
}

const logout =async(req,res) =>{
    try {
       
        // token add kar dunga redis me blocklist kr denge
        const {token} = req.cookies;

        const payload = jwt.decode(token);

        await redisClient.set(`token:${token}`,`Blocked`);
        await redisClient.expireAt(`token:${token}`,payload.exp);

        res.cookie("token",null,{expires:new Date(Date.now())});
        res.send("logged out successfully");

    } catch (error) {
        res.status(503).send("Error: "+error);
    }
}

const adminRegister = async(req,res) =>{
     try {
        // validate the data 
           validate(req.body);
   
           const {firstName,emailId,password} = req.body;
           // email id aready exists kar rhi hai and again use email se doosra account bnaoge toh automatically error dedega
           
           req.body.password = await bcrypt.hash(password,10);
           req.body.role = "admin";   // is wale path se agr koi bhi aayega toh voh as a user hi registered hoga
   
           const user = await User.create(req.body);
           
           const token = jwt.sign({_id:user._id,emailId:emailId,role:"user"},process.env.JWT_KEY,{expiresIn:3600});
   
           res.cookie("token",token,{maxAge:60*60*1000});
   
           res.status(201).send("user created successfully");
       
     } catch (error) {
        res.status(400).send("Error: ",error);
     }
}


export{ register,login,logout,adminRegister};