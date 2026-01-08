import { Router } from "express";
import { uploadVideo, getVideos, deleteVideoController } from "./video.controller.js";
import { uploadVideo as multerUpload } from "../../shared/utils/fileUpload.js";

const router = Router();

router.post("/videos", multerUpload.single("file"), uploadVideo);
router.get("/videos", getVideos);
router.delete("/videos/:id", deleteVideoController);

export default router;
