import { Problem } from "../models/problem";
import { Submission } from "../models/submission";
import { getLanguageVersion } from "../utils/problemUtility";

const submitCode = async(req,res)=>{
   const userId = req.result._id;
   const problemId = req.params.id;

   const {code,language} = req.body;

   if(!userId||!code||!language||!problemId){
        return res.status(400).send("some field missing");
   }

   //fetch problem from db
   const problem = await Problem.findById(problemId);
   
   //storing submiision first in db to avoid server side error
   const submittedResult = await Submission.create({
      userId,
      problemId,
      code,
      language,
      testCasesPassed:0,
      status:"pending",
      testCasesTotal:problem.hiddenTestCases.length
   })

   // judege0 ko code submit krna hai
   const version = getLanguageVersion(language);
}

export {submitCode}