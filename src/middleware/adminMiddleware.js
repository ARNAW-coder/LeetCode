import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import { redisClient } from "../config/redis.js";

const adminMiddleware = async(req,res,next)=>{
       try{

        const {token}= req.cookies;
        if(!token){
            throw new Error("Token is not present");
        }

        const payload = jwt.verify(token,process.env.JWT_KEY);

        const {_id}= payload;
        if(!_id){
            throw new Error("invalid token")
        }

        if(payload.role!="admin"){
            throw new Error("invalid token");
        }

        const result = await User.findById(_id);
        if(!result){
            throw new Error("user doesn't exist");
        }
        
        //redis ke blocklist me toh nhi present hai..

        const IsBlocked = await redisClient.exists(`token:${token}`);
        if(IsBlocked){
            throw new Error("invalid token");
        }

        req.result = result;

        next();
       }
       catch(err){
          res.status(401).send("error :",err);
       }
}

export {adminMiddleware};