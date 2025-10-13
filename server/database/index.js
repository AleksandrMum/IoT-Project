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
import temperaturesModel from "./models/temperatures.js";
import motionsModel from "./models/motions.js";

db.devices = devicesModel(client, Sequelize, DataTypes);
db.temperatures = temperaturesModel(client, Sequelize, DataTypes);
db.motions = motionsModel(client, Sequelize, DataTypes);

db.devices.hasMany(db.temperatures, {
    foreignKey: 'deviceId',
    onDelete: 'CASCADE',
});
db.temperatures.belongsTo(db.devices, {
    foreignKey: 'deviceId',
});
db.devices.hasMany(db.motions, {
    foreignKey: 'deviceId',
    onDelete: 'CASCADE',
});
db.motions.belongsTo(db.devices, {
    foreignKey: 'deviceId',
});

export default db;
