import express from  "express";
import {adminMiddleware} from "../middleware/adminMiddleware.js";
import { createProblem, updateProblem, deleteProblem} from "../controllers/userProblem.js";
import { userMiddleware } from "../middleware/userMiddleware.js";
const problemRouter = express.Router();

//create a problem

// yha admin ka access chahiye....
problemRouter.post("/create", adminMiddleware, createProblem);  
problemRouter.put("/update/:id", adminMiddleware, updateProblem);
problemRouter.delete("/delete/:id", adminMiddleware, deleteProblem);

// yha bs user authenticated hona chahiye...
problemRouter.get("/problemById/:id",userMiddleware, getProblemById);
problemRouter.get("/getAllProblem",userMiddleware, getAllProblem);
problemRouter.get("/problemSolvedByUser",userMiddleware, solvedAllProblembyUser);

export {problemRouter};