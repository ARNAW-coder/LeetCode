import express from "express";
import { userMiddleware } from "../middleware/userMiddleware";
import { submitCode } from "../controllers/userSubmission";
const submitRouter = express.Router();

submitRouter.post("/submit/:id",userMiddleware, submitCode);