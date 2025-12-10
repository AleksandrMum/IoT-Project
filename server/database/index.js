import { Sequelize, Op, DataTypes } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// ==================== Настройка подключения ====================

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

// ==================== Инициализация моделей ====================

import houseModel from "./models/house.js";
import userModel from "./models/user.js";
import houseUserModel from "./models/houseUser.js";
import deviceModel from "./models/device.js";
import settingModel from "./models/setting.js";
import sensorModel from "./models/sensor.js";
import sensorDataModel from "./models/sensorData.js";
import scenarioModel from "./models/scenario.js";
import scenarioActionModel from "./models/scenarioAction.js";
import logModel from "./models/log.js";

db.house = houseModel(client, Sequelize, DataTypes);
db.user = userModel(client, Sequelize, DataTypes);
db.houseUser = houseUserModel(client, Sequelize, DataTypes);
db.device = deviceModel(client, Sequelize, DataTypes);
db.setting = settingModel(client, Sequelize, DataTypes);
db.sensor = sensorModel(client, Sequelize, DataTypes);
db.sensorData = sensorDataModel(client, Sequelize, DataTypes);
db.scenario = scenarioModel(client, Sequelize, DataTypes);
db.scenarioAction = scenarioActionModel(client, Sequelize, DataTypes);
db.log = logModel(client, Sequelize, DataTypes);

// ==================== Связи моделей ====================

// Связи таблицы House
db.house.hasMany(db.device, {
    foreignKey: 'houseId',
    onDelete: 'CASCADE',
});
db.device.belongsTo(db.house, {
    foreignKey: 'houseId',
});

db.house.hasMany(db.sensor, {
    foreignKey: 'houseId',
    onDelete: 'CASCADE',
});
db.sensor.belongsTo(db.house, {
    foreignKey: 'houseId',
});

db.house.hasMany(db.scenario, {
    foreignKey: 'houseId',
    onDelete: 'CASCADE',
});
db.scenario.belongsTo(db.house, {
    foreignKey: 'houseId',
});

db.house.hasMany(db.houseUser, {
    foreignKey: 'houseId',
    onDelete: 'CASCADE',
});
db.houseUser.belongsTo(db.house, {
    foreignKey: 'houseId',
});

db.house.hasMany(db.log, {
    foreignKey: 'houseId',
    onDelete: 'CASCADE',
});
db.log.belongsTo(db.house, {
    foreignKey: 'houseId',
});

// Связи таблицы User
db.user.hasMany(db.houseUser, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});
db.houseUser.belongsTo(db.user, {
    foreignKey: 'userId',
});

db.user.hasMany(db.log, {
    foreignKey: 'userId',
    onDelete: 'SET NULL',
});
db.log.belongsTo(db.user, {
    foreignKey: 'userId',
});

// Связи таблицы Device
db.device.hasMany(db.setting, {
    foreignKey: 'deviceId',
    onDelete: 'CASCADE',
});
db.setting.belongsTo(db.device, {
    foreignKey: 'deviceId',
});

db.device.hasMany(db.scenarioAction, {
    foreignKey: 'deviceId',
    onDelete: 'CASCADE',
});
db.scenarioAction.belongsTo(db.device, {
    foreignKey: 'deviceId',
});

// Связи таблицы Sensor
db.sensor.hasMany(db.sensorData, {
    foreignKey: 'sensorId',
    onDelete: 'CASCADE',
});
db.sensorData.belongsTo(db.sensor, {
    foreignKey: 'sensorId',
});

// Связи таблицы Scenario
db.scenario.hasMany(db.scenarioAction, {
    foreignKey: 'scenarioId',
    onDelete: 'CASCADE',
});
db.scenarioAction.belongsTo(db.scenario, {
    foreignKey: 'scenarioId',
});

export default db;
