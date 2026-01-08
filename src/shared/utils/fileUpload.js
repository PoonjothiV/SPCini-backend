import multer from "multer";
import path from "path";

import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadPath = path.join(__dirname, "../../../uploads/videos");

// Ensure directory exists
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const ext = path.extname(file.originalname);
        const base = path.basename(file.originalname, ext).replace(/\s+/g, "-");
        cb(null, `${base}-${timestamp}${ext}`);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype !== "video/mp4") {
        return cb(new Error("Only MP4 files allowed"), false);
    }
    cb(null, true);
};

export const uploadVideo = multer({ storage, fileFilter });