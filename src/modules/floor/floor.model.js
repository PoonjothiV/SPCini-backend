// src/modules/floor/floor.model.js
import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const Floor = sequelize.define("Floor", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  screenCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  theatreId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "floors",
  timestamps: true,
});

export default Floor;
