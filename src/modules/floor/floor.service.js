// src/modules/floor/floor.service.js
import Floor from "./floor.model.js";
import Screen from "../screens/screen.model.js";

export default {
    // ✅ Create a new floor
    async createFloor(data) {
        if (!data.name) throw new Error("Floor name is required");
        if (!data.theatreId) throw new Error("Theatre ID is required");

        const floor = await Floor.create(data);

        // Update screens to belong to this floor
        if (data.screenIds && Array.isArray(data.screenIds)) {
            await Screen.update({ floorId: floor.id }, { where: { id: data.screenIds } });
        }

        return await Floor.findByPk(floor.id, {
            include: [{ model: Screen, as: "screens" }],
        });
    },

    // ✅ Get all floors with their screens
    async getFloors(theatreId = null) {
        const where = theatreId ? { theatreId } : {};
        return await Floor.findAll({
            where,
            include: [{ model: Screen, as: "screens" }],
        });
    },

    // ✅ Get single floor by ID
    async getFloorById(id) {
        const floor = await Floor.findByPk(id, {
            include: [{ model: Screen, as: "screens" }],
        });
        if (!floor) throw new Error("Floor not found");
        return floor;
    },

    // ✅ Update floor
    async updateFloor(id, data) {
        const floor = await Floor.findByPk(id);
        if (!floor) throw new Error("Floor not found");

        if (data.name) floor.name = data.name;
        if (data.theatreId) floor.theatreId = data.theatreId;
        if (data.screenCount !== undefined) floor.screenCount = data.screenCount;

        await floor.save();

        // Update screens to belong to this floor
        if (data.screenIds && Array.isArray(data.screenIds)) {
            // First clear old ones that were linked to this floor
            await Screen.update({ floorId: null }, { where: { floorId: id } });
            // Set the new selection
            await Screen.update({ floorId: id }, { where: { id: data.screenIds } });
        }

        return await Floor.findByPk(id, {
            include: [{ model: Screen, as: "screens" }],
        });
    },

    // ✅ Delete floor
    async deleteFloor(id) {
        const floor = await Floor.findByPk(id);
        if (!floor) throw new Error("Floor not found");

        await floor.destroy();
        return { message: "Floor deleted successfully" };
    },
};
