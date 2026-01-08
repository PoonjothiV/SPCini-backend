// src/modules/theatre/theatre.routes.js
import express from "express";
import theatreController from "./theatre.controller.js";

const router = express.Router();

// ✅ Create theatre
router.post("/theatres", theatreController.create);

// ✅ Get all theatres
router.get("/theatres", theatreController.getAll);

// ✅ Get theatre by ID
router.get("/theatres/:id", theatreController.getById);

// ✅ Update theatre
router.put("/theatres/:id", theatreController.update);

// ✅ Delete theatre
router.delete("/theatres/:id", theatreController.remove);

export default router;
