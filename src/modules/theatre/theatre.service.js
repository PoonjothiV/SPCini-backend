// src/modules/theatre/theatre.service.js
import Theatre from "./theatre.model.js";
import Floor from "../floor/floor.model.js";

export default {
  // ✅ Create a new theatre
  async createTheatre({ name, location }) {
    if (!name) throw new Error("Theatre name is required");
    const theatre = await Theatre.create({ name, location });
    return theatre;
  },

  // ✅ Get all theatres with their floors
  async getTheatres() {
    return Theatre.findAll({
      include: [{ model: Floor, as: "floors" }],
    });
  },

  // ✅ Get single theatre by ID
  async getTheatreById(id) {
    const theatre = await Theatre.findByPk(id, {
      include: [{ model: Floor, as: "floors" }],
    });
    if (!theatre) throw new Error("Theatre not found");
    return theatre;
  },

  // ✅ Update theatre
  async updateTheatre(id, { name, location }) {
    const theatre = await Theatre.findByPk(id);
    if (!theatre) throw new Error("Theatre not found");

    if (name) theatre.name = name;
    if (location) theatre.location = location;

    await theatre.save();
    return theatre;
  },

  // ✅ Delete theatre
  async deleteTheatre(id) {
    const theatre = await Theatre.findByPk(id);
    if (!theatre) throw new Error("Theatre not found");

    await theatre.destroy();
    return { message: "Theatre deleted successfully" };
  },
};
