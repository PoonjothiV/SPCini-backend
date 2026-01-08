// backend/src/modules/screens/screen.service.js
import Screen from "./screen.model.js";
import Video from "../videos/video.model.js";

export async function createScreen({ name, slug, floorId }) {
  return await Screen.create({ name, slug, floorId });
}

export async function assignVideoToScreen(screenId, videoId) {
  const screen = await Screen.findByPk(screenId);
  if (!screen) throw new Error("Screen not found");
  screen.video_id = videoId;
  await screen.save();
  return screen;
}

export async function getScreenBySlug(slug) {
  return await Screen.findOne({
    where: { slug },
    include: { model: Video, as: "videos" },
  });
}

export async function getScreenById(id) {
  return await Screen.findByPk(id, {
    include: [
      { model: Video, as: "videos" },
      {
        model: (await import("../floor/floor.model.js")).default,
        as: "floor",
        include: [{ model: (await import("../theatre/theatre.model.js")).default, as: "theatre" }]
      }
    ],
  });
}

export async function getAllScreens(floorId = null) {
  const options = {
    include: [
      { model: Video, as: "videos" },
      { model: (await import("../floor/floor.model.js")).default, as: "floor" }
    ],
    where: floorId ? { floorId } : {},
  };
  return await Screen.findAll(options);
}
