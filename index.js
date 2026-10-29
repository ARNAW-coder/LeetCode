import express from "express";
import { main } from "./src/config/db.js";
import dotenv from "dotenv";
dotenv.config({path:"./.env"});
import cookieParser from "cookie-parser"; 
import { authRouter } from "./src/routes/userAuth.js";
import { problemRouter } from "./src/routes/problemCreator.js";
import { redisClient } from "./src/config/redis.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/user",authRouter);
app.use("/problem",problemRouter);

const InitializeConnection = async ()=>{
    try {
         await Promise.all([main(),redisClient.connect()]);
         console.log("DB connected..");

         app.listen(process.env.PORT, ()=>{
            console.log("server is listening at port number: "+ process.env.PORT);
         })
    } catch (error) {
         console.log("Error: ",err);
    }
}

InitializeConnection();
