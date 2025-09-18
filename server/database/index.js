import db_conf from "./config.js";
import { Sequelize, Op, DataTypes } from "sequelize";

const client = new Sequelize(db_conf.DB, db_conf.USER, db_conf.PASSWORD, {
    host: db_conf.HOST,
    port: db_conf.PORT,
    dialect: db_conf.DIALECT,
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
