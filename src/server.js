// backend/src/server.js
import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { syncDB } from "./config/db.js";
import "./modules/associations/index.js";

import theatreRoutes from "./modules/theatre/theatre.routes.js";
import floorRoutes from "./modules/floor/floor.routes.js";
import videoRoutes from "./modules/videos/video.routes.js";
import screenRoutes from "./modules/screens/screen.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/**
 * CORS
 * - Works for localhost (any port)
 * - Works for Vercel production
 * - Safe for learning / demo
 */
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

// static uploads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// health check (Render / monitoring)
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// API routes
app.use("/api", videoRoutes);
app.use("/api", screenRoutes);
app.use("/api", theatreRoutes);
app.use("/api", floorRoutes);

// global error handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(err.status || 500).json({
    message: err.message || "Server error",
  });
});

const PORT = process.env.PORT || 8000;

// start server only after DB sync
(async () => {
  try {
    await syncDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  }
})();
