import { DataTypes } from "sequelize";
import Sequelize from "../../config/db.js";

const Theatre=  Sequelize.define("Theatre",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },

    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },

    location:{
        type:DataTypes.STRING,
        allowNull:false
    },
}, {
    tableName:"theatres",
    timestamps:true,
});

export default Theatre;