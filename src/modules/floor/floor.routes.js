// src/modules/floor/floor.routes.js
import express from "express";
import floorController from "./floor.controller.js";

const router = express.Router();

// ✅ Create floor
router.post("/floors", floorController.create);

// ✅ Get all floors
router.get("/floors", floorController.getAll);

// ✅ Get floor by ID
router.get("/floors/:id", floorController.getById);

// ✅ Update floor
router.put("/floors/:id", floorController.update);

// ✅ Delete floor
router.delete("/floors/:id", floorController.remove);

export default router;
