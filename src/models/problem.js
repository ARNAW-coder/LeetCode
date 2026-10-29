import mongoose,{Schema} from "mongoose";

const problemSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    difficulty:{
        type:String,
        enum:["easy","medium","hard"]
    },
    tags:{
        type:String,
        enum:["array","LinkedList","graph","dp"],
        required:true,
    },
    visibleTestCases:[
        {
            input:{
                type:String,
                required:true,
            },
            output:{
                type:String,
                required:true,
            },
            explanation:{
                type:String,
                required:true
            }
        }
    ],
    hiddenTestCases:[
        {
            input:{
                type:String,
                required:true,
            },
            output:{
                type:String,
                required:true,
            }
        }
    ],

    startCode:[
        {
            language:{
                type:String,
                required:true
            },
            initialCode:{
                type:String,
                required:true
            }
        }
    ],

    referenceSolution:[
        {
            language:{
                type:String,
                required:true
            },
            functionalCode:{
                type:String,
                required:true
            },
            implementerCode:{
                type:String,
                required:true
            }
        }
    ],

    problemCreator:{
        type: Schema.Types.ObjectId,   // iska matlab jo bnaya hai uska id store karlo....
        ref:"user",     // reference bhi do kaha hai woh here userschema which can be accessed by "user"
        required:true,
    }
})

const Problem = mongoose.model("problem",problemSchema);

export {Problem};