// src/modules/theatre/theatre.controller.js
import theatreService from "./theatre.service.js";

export default {
  // ✅ Create theatre
  async create(req, res, next) {
    try {
      const theatre = await theatreService.createTheatre(req.body);
      res.status(201).json(theatre);
    } catch (err) {
      next(err);
    }
  },

  // ✅ Get all theatres
  async getAll(req, res, next) {
    try {
      const theatres = await theatreService.getTheatres();
      res.json(theatres);
    } catch (err) {
      next(err);
    }
  },

  // ✅ Get theatre by ID
  async getById(req, res, next) {
    try {
      const theatre = await theatreService.getTheatreById(req.params.id);
      res.json(theatre);
    } catch (err) {
      next(err);
    }
  },

  // ✅ Update theatre
  async update(req, res, next) {
    try {
      const theatre = await theatreService.updateTheatre(req.params.id, req.body);
      res.json(theatre);
    } catch (err) {
      next(err);
    }
  },

  // ✅ Delete theatre
  async remove(req, res, next) {
    try {
      const result = await theatreService.deleteTheatre(req.params.id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
};
