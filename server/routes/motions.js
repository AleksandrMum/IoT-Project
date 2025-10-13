import express from "express";
import '../database/typedef_db.js';
const router = express.Router();

/**
 * @param { database } db
 * @returns {express.Router}
 */
export default (db) => {
    // Маршрут получения всех данных с датчиков движения
    router.get("/", async (req, res) => {
        try {
            const motionsData = await db.motions.findAll({
                include: [{
                    model: db.devices,
                    attributes: ['name']
                }]
            });
            res.json(motionsData);
        } catch (err) {
            res.status(500).json({ error: err });
        }
    });

    // Маршрут регистрации нового движения
    router.post("/", async (req, res) => {
        try {
            const motion = await db.motions.create({
                deviceId: req.body.deviceId,
                motionDetected: req.body.motionDetected,
                createdAt: new Date()
            });
            res.status(201).json(motion);
        } catch (err) {
            res.status(400).json({ error: "Cannot register this motion" });
        }
    });

    // Маршрут удаления списка записей о движении
    router.delete("/", async (req, res) => {
        try {
            const motionsUuids = req.body.motionsUuids; // Ожидается массив UUID
            if (!Array.isArray(motionsUuids) || motionsUuids.length === 0) {
                return res.status(400).json({ error: "Invalid or empty motionsUuids array" });
            }
            const deleteResult = await db.motions.destroy({
                where: {
                    uuid: motionsUuids
                }
            });
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ error: err });
        }
    });

    return router;
};
