import express from "express";
const router = express.Router();

import devicesRouter from './devices.js';
import commandsRouter from './commands.js';

export default (db) => {
    router.use("/devices", devicesRouter(db));
    router.use("/commands", commandsRouter(db));

    return router;
};
