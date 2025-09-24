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
            const commands = await db.commands.findAll();
            res.json(commands);
        } catch (err) {
            res.status(500).json({ error: err });
        }
    });

    router.post("/", async (req, res) => {
        try {
            const command = await db.commands.create(req.body);
            res.status(201).json(command);
        } catch (err) {
            res.status(400).json({ error: err });
        }
    });

    return router;
};
