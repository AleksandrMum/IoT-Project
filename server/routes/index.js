import express from "express";
const router = express.Router();

import devicesRouter from './devices.js';
import motionRouter from './motions.js'
import temperaturesRouter from './temperatures.js'

export default (db) => {
    router.use("/devices", devicesRouter(db));
    router.use("/motions", motionRouter(db));
    router.use("/temperatures", temperaturesRouter(db));

    return router;
};
