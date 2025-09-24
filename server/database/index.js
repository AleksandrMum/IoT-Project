import { Sequelize, Op, DataTypes } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const client = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        define: {
            timestamps: false,
        },
        logging: false,
});

const db = {};
db.Sequelize = Sequelize;
db.Op = Op;
db.DataTypes = DataTypes;
db.client = client;

import devicesModel from "./models/devices.js";
import commandsModel from "./models/commands.js";

db.devices = devicesModel(client, Sequelize, DataTypes);
db.commands = commandsModel(client, Sequelize, DataTypes);

db.devices.hasMany(db.commands, {
    foreignKey: 'deviceId',
    onDelete: 'CASCADE',
});
db.commands.belongsTo(db.devices, {
    foreignKey: 'deviceId',
});

export default db;
