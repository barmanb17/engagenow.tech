import express from "express";
import { createProject, getClientProjects} from "../controllers/projectController.js";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/", authMiddleware, createProject);
router.get("/", authMiddleware, getClientProjects);


export default router;