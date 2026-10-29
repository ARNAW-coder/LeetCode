import mongoose,{Schema} from "mongoose";

const submissionSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    problemId:{
        type:Schema.Types.ObjectId,
        ref:"problem",
        required:true
    },
    code:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true,
        enum:["cpp","java","python3"]
    },
    status:{
        type:String,
        enum:["pending","accepted","wrong","error"],
    },
    runtime:{
        type:Number,  //milliseconds
        default:0
    },
    memory:{
        type:Number,  //kb
        default:0
    },
    errorMessage:{
        type:String,
        default:''
    },
    testCasesPassed:{
        type:Number,
        default:0
    },
    testCasesTotal:{
        type:Number,
        default:0
    }
},{timestamps:true})

const Submission = mongoose.model("submision",submissionSchema);

export{Submission}