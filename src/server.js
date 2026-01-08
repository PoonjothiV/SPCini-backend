// backend/src/server.js
import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { syncDB } from "./config/db.js";
import '../src/modules/associations/index.js'
import theatreRoutes from './modules/theatre/theatre.routes.js';
import floorRoutes from "./modules/floor/floor.routes.js";
import videoRoutes from "./modules/videos/video.routes.js";
import screenRoutes from "./modules/screens/screen.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/api", videoRoutes);
app.use("/api", screenRoutes);
app.use("/api", theatreRoutes);
app.use("/api", floorRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, async () => {
  await syncDB();
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
