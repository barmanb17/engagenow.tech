import express from "express";
import { getClientProjects} from "../controllers/projectController.js";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", authMiddleware, getClientProjects);

export default router;