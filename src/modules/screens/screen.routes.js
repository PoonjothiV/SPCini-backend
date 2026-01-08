// backend/src/modules/screens/screen.routes.js
import { Router } from "express";
import {
    createScreenController,
    assignVideoController,
    getScreenController,
    getAllScreensController,
    getScreenByIdController
} from "./screen.controller.js";

const router = Router();

router.post("/screens", createScreenController);
router.post("/screens/assign", assignVideoController);
router.get("/screens", getAllScreensController);
router.get("/screens/:slug", getScreenController);
router.get("/screens/id/:id", getScreenByIdController);

export default router;
