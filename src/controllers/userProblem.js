import {getLanguageVersion , getCodeResult} from "../utils/problemUtility.js";
import {cppTemplate, pythonTemplate, javaTemplate} from "../utils/langTemplate.js"
import { Problem } from "../models/problem.js";

const createProblem = async(req,res)=>{

    //api request to authenticate user...
    const {title,description,difficulty,tags,visibleTestCases,hiddenTestCases,startCode,referenceSolution,problemCreator} = req.body;
    
    try {
        for(const {language,functionalCode,implementerCode} of referenceSolution){
            
            let completeCode;
            if(language == "cpp"){
                completeCode = cppTemplate(functionalCode,implementerCode);
            }
            else if(language == "java"){
                completeCode = javaTemplate(functionalCode,implementerCode);
            }
            else if(language == "python3"){
                completeCode = pythonTemplate(functionalCode,implementerCode);
            }

            const version = getLanguageVersion(language);
            if(!version){
                return res.status(500).send("lang verson getting error");
            }

        //     console.log(version);
        //     console.log(language);
        //     console.log(JSON.stringify({
        //       clientId: process.env.JDOODLE_CLIENT_ID,
        //       clientSecret: process.env.JDOODLE_CLIENT_SECRET,
  
        //       script: completeCode,
  
        //       stdin: "",
  
        //       language: language,
        //       versionIndex: version
        //   }));

            const submitResult = await getCodeResult(completeCode, version, language);
            if(!submitResult){
                throw new Error("error at submitresult",error);
            }
            const tempResult = await submitResult.json();
            const output = tempResult.output;
            const result = await JSON.parse(output).map(String);
            // console.log(result);

            const solArr = visibleTestCases.map(test => test.output);
            // console.log(solArr);

            const equal = result.length === solArr.length &&
              result.every((value, index) => value === solArr[index]);

            if(equal){
                const problem = await Problem.create({...req.body,
                    problemCreator:req.result._id
                });

                return res.status(201).send("problem saved successfully....")
            }
            else{
                return res.status(tempResult.statusCode).send(tempResult.error);
            }
        }
    } catch (err) {
        console.log(err);
       return res.status(400).send("Error"+err);
    }


    


}

const updateProblem = async(req,res)=>{
    
    //api request to authenticate user...
    const {id} = req.params;
    const {title,description,difficulty,tags,visibleTestCases,hiddenTestCases,startCode,referenceSolution,problemCreator} = req.body;
    
    try {
        if(!id){
            return res.status(404).send("id is not found");

        }
        const dsaProblem = await Problem.findById(id);
        if(!dsaProblem){
            return res.status(404).send("problem by given id not found")
        }

        for(const {language,functionalCode,implementerCode} of referenceSolution){
            
            let completeCode;
            if(language == "cpp"){
                completeCode = cppTemplate(functionalCode,implementerCode);
            }
            else if(language == "java"){
                completeCode = javaTemplate(functionalCode,implementerCode);
            }
            else if(language == "python3"){
                completeCode = pythonTemplate(functionalCode,implementerCode);
            }

            const version = getLanguageVersion(language);
            if(!version){
                return res.status(500).send("lang verson getting error");
            }

        //     console.log(version);
        //     console.log(language);
        //     console.log(JSON.stringify({
        //       clientId: process.env.JDOODLE_CLIENT_ID,
        //       clientSecret: process.env.JDOODLE_CLIENT_SECRET,
  
        //       script: completeCode,
  
        //       stdin: "",
  
        //       language: language,
        //       versionIndex: version
        //   }));

            const submitResult = await getCodeResult(completeCode, version, language);
            if(!submitResult){
                throw new Error("error at submitresult",error);
            }
            const tempResult = await submitResult.json();
            const output = tempResult.output;
            const result = await JSON.parse(output).map(String);
            // console.log(result);

            const solArr = visibleTestCases.map(test => test.output);
            // console.log(solArr);

            const equal = result.length === solArr.length &&
              result.every((value, index) => value === solArr[index]);

            if(equal){
                const newProblem = await Problem.findByIdAndUpdate(id,{...req.body},{runValidators:true, new:true})

                return res.status(200).send(newProblem);
            }
            else{
                return res.status(tempResult.statusCode).send(tempResult.error);
            }
        }
    } catch (err) {
        console.log(err);
       return res.status(400).send("Error"+err);
    }
}    
    
const deleteProblem = async(req,res)=>{
    const {id} = req.params;
    try {
        if(!id){
            return res.status(400).send("id is missing");
        }

        const deletedProblem = await Problem.findByIdAndDelete(id);
        if(!deletedProblem){
            return res.status(404).send("problem is missing");
        }

        return res.status(200).send("successfully deleetdd")
    } catch (error) {
          return res.status(500).send("error"+ error);  
    }
}

const getProblemById = async(req,res)=>{
    const {id} = req.params;
    try {
        if(!id){
            return res.status(400).send("id is missing");
        }

        const getProblem = await Problem.findById(id).select("_id title description difficulty tags visibleTestCases startCode referenceSolution");

        if(!getProblem){
            return res.status(404).send("problem is missing");
        }

        return res.status(200).send(getProblem);
    } catch (error) {
          return res.status(500).send("error"+ error);  
    }
}

const getAllProblem = async(req,res)=>{
     const {id} = req.params;
    try {
        if(!id){
            return res.status(400).send("id is missing");
        }

        const getProblem = await Problem.find({}).select("_id title difficulty tags");
        if(getProblem.length==0){
            return res.status(404).send("problem is missing");
        } 

        return res.status(200).send(getProblem);
    } catch (error) {
          return res.status(500).send("error"+ error);  
    }
}


export {createProblem,updateProblem,deleteProblem,getProblemById,getAllProblem};