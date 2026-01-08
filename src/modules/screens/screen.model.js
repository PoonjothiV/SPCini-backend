// backend/src/modules/screens/screen.model.js
import { DataTypes } from "sequelize";
import db from "../../config/db.js";
import Video from "../videos/video.model.js";

const Screen = db.define("Screen", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  floorId: { type: DataTypes.INTEGER, allowNull: true },
  video_id: { type: DataTypes.INTEGER, allowNull: true },
}, {
  tableName: "screens",
  timestamps: false,
});

// Relation: Screen → Video (Handled in associations/index.js)
// Screen.belongsTo(Video, { foreignKey: "video_id", as: "video" });

export default Screen;
