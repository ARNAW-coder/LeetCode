import mongoose,{Schema} from "mongoose";

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20,
    },
    lastName:{
        type:String,
        minLength:3,
        maxLength:20,
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        immutable:true,
    },
    age:{
        type:Number,
        min:6,
        max:80,
    },
    problemSolved:{
        type:[String],
        default:[],
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user",
    },
    password:{
        type:String,
        required:true,
    },

},{timestamps:true})

const User = mongoose.model("user",userSchema);

export {User};