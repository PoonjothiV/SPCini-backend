import Theatre from "../theatre/theatre.model.js";
import Floor from "../floor/floor.model.js";
import Screen from "../screens/screen.model.js";
import Video from "../videos/video.model.js";

/*
|--------------------------------------------------------------------------
| Theatre ↔ Floor (ONE → MANY)
|--------------------------------------------------------------------------
| One theatre can have many floors
| Each floor belongs to one theatre
*/

Theatre.hasMany(Floor, {
  foreignKey: "theatreId",
  as: "floors",
});

Floor.belongsTo(Theatre, {
  foreignKey: "theatreId",
  as: "theatre",
});

/*
|--------------------------------------------------------------------------
| Floor ↔ Screen (MANY ↔ MANY)
|--------------------------------------------------------------------------
| One floor can have many screens
| One screen can belong to many floors
| Uses join table: FloorScreens
*/

Floor.hasMany(Screen, {
  foreignKey: "floorId",
  as: "screens",
});

Screen.belongsTo(Floor, {
  foreignKey: "floorId",
  as: "floor",
});

/*
|--------------------------------------------------------------------------
| Screen ↔ Video (ONE → MANY)
|--------------------------------------------------------------------------
| One screen can have many videos (playlist)
| Each video belongs to one screen (as per user requirement)
*/

Screen.belongsToMany(Video, {
  through: "ScreenVideos",
  foreignKey: "screenId",
  otherKey: "videoId",
  as: "videos",
});

Video.belongsToMany(Screen, {
  through: "ScreenVideos",
  foreignKey: "videoId",
  otherKey: "screenId",
  as: "screens",
});

/*
|--------------------------------------------------------------------------
| Export models
|--------------------------------------------------------------------------
*/

export {
  Theatre,
  Floor,
  Screen,
  Video,
};
