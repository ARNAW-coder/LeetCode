import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config({ path: "../.env" });

async function main() {
    await mongoose.connect(process.env.DB_CONNECT_STRING);    
}

export {main};   