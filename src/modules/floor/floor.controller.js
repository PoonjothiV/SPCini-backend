// src/modules/floor/floor.controller.js
import floorService from "./floor.service.js";

export default {
  // ✅ Create floor
  async create(req, res, next) {
    try {
      const floor = await floorService.createFloor(req.body);
      res.status(201).json(floor);
    } catch (err) {
      next(err);
    }
  },

  // ✅ Get all floors
  async getAll(req, res, next) {
    try {
      const { theatreId } = req.query;
      const floors = await floorService.getFloors(theatreId);
      res.json(floors);
    } catch (err) {
      next(err);
    }
  },

  // ✅ Get floor by ID
  async getById(req, res, next) {
    try {
      const floor = await floorService.getFloorById(req.params.id);
      res.json(floor);
    } catch (err) {
      next(err);
    }
  },

  // ✅ Update floor
  async update(req, res, next) {
    try {
      const floor = await floorService.updateFloor(req.params.id, req.body);
      res.json(floor);
    } catch (err) {
      next(err);
    }
  },

  // ✅ Delete floor
  async remove(req, res, next) {
    try {
      const result = await floorService.deleteFloor(req.params.id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
};
