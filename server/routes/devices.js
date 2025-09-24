import express from "express";
import '../database/typedef_db.js';
const router = express.Router();

/**
 * @param { database } db
 * @returns {express.Router}
 */
export default (db) => {
    router.get("/", async (req, res) => {
        try {
            const devices = await db.devices.findAll();
            res.json(devices);
        } catch (err) {
            res.status(500).json({ error: err });
        }
    });

    router.post("/", async (req, res) => {
        try {
            const device = await db.devices.create(req.body);
            res.status(201).json(device);
        } catch (err) {
            res.status(400).json({ error: err });
        }
    });

    return router;
};
