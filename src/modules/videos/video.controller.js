import path from "path";
import { createVideo, listVideos, assignVideoToScreens, deleteVideo } from "./video.service.js";

export async function uploadVideo(req, res) {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        const title = req.body.title || path.basename(req.file.originalname, ".mp4");
        const url = `/uploads/videos/${req.file.filename}`;

        // Support both single screen_id and an array of screenIds
        const screen_id = req.body.screen_id || null;
        let screenIds = req.body.screenIds;
        if (screenIds && typeof screenIds === 'string') {
            try {
                screenIds = JSON.parse(screenIds);
            } catch (e) {
                screenIds = screenIds.split(',').map(id => id.trim());
            }
        }

        const video = await createVideo({
            title,
            filename: req.file.filename,
            url,
            screen_id,
            screenIds
        });

        res.status(201).json({ message: "Video Uploaded", video });
    } catch (error) {
        console.error("Error in uploadVideo:", error);
        res.status(500).json({ message: error.message });
    }
}

export async function getVideos(req, res) {
    try {
        const { screenId } = req.query;
        const videos = await listVideos(screenId);
        res.json({ items: videos });
    } catch (error) {
        console.error("Error in getVideos:", error);
        res.status(500).json({ message: error.message });
    }
}

export async function assignVideoController(req, res) {
    try {
        const { videoId, screenIds } = req.body;
        const video = await assignVideoToScreens(videoId, screenIds);
        res.json({ message: "Assignment updated", video });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function deleteVideoController(req, res) {
    try {
        await deleteVideo(req.params.id);
        res.json({ message: "Video deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}