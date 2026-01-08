import { DataTypes } from "sequelize";
import db from "../../config/db.js";


const Video = db.define("Video", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    fileName: { type: DataTypes.STRING, allowNull: false },
    url: { type: DataTypes.STRING, allowNull: false },
    screen_id: { type: DataTypes.INTEGER, allowNull: true }, // Added for specific screen association
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
    tableName: "Videos",
    timestamps: false,
});

export default Video;