import Video from './video.model.js';
import Screen from '../screens/screen.model.js';

export async function createVideo({ title, filename, url, screen_id, screenIds }) {
    const video = await Video.create({ title, fileName: filename, url, screen_id });

    // Handle Many-to-Many association if screenIds provided
    if (screenIds && Array.isArray(screenIds)) {
        await video.setScreens(screenIds);
    }

    return video;
}

export async function listVideos(screenId = null) {
    const options = {
        order: [["id", "DESC"]],
        include: [{ model: Screen, as: "screens" }]
    };

    if (screenId) {
        options.include = [{
            model: Screen,
            as: "screens",
            where: { id: screenId },
            attributes: [] // Just for filtering
        }];
    }

    return await Video.findAll(options);
}

export async function deleteVideo(id) {
    const video = await Video.findByPk(id);
    if (!video) throw new Error("Video not found");
    return await video.destroy();
}

export async function assignVideoToScreens(videoId, screenIds) {
    const video = await Video.findByPk(videoId);
    if (!video) throw new Error("Video not found");

    if (screenIds && Array.isArray(screenIds)) {
        await video.setScreens(screenIds);
    }
    return video;
}