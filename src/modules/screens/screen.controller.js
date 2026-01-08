import { createScreen, assignVideoToScreen, getScreenBySlug, getScreenById, getAllScreens } from "./screen.service.js";

export async function getScreenByIdController(req, res) {
  const { id } = req.params;
  const screen = await getScreenById(id);
  if (!screen) return res.status(404).json({ message: "Screen not found" });
  res.json({ screen });
}

export async function createScreenController(req, res) {
  const { name, slug, floorId } = req.body;
  if (!name || !slug) return res.status(400).json({ message: "Name and slug required" });

  const screen = await createScreen({ name, slug, floorId });
  res.status(201).json({ message: "Screen created", screen });
}

export async function assignVideoController(req, res) {
  const { screenId, videoId } = req.body;
  if (!screenId || !videoId) return res.status(400).json({ message: "screenId and videoId required" });

  const screen = await assignVideoToScreen(screenId, videoId);
  res.json({ message: "Video assigned to screen", screen });
}

export async function getScreenController(req, res) {
  const { slug } = req.params;
  const screen = await getScreenBySlug(slug);
  if (!screen) return res.status(404).json({ message: "Screen not found" });

  res.json({ screen });
}

export async function getAllScreensController(req, res) {
  const { floorId } = req.query;
  const screens = await getAllScreens(floorId);
  res.json({ screens });
}
