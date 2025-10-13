import express from "express";
import '../database/typedef_db.js';
const router = express.Router();

/**
 * @param { database } db
 * @returns {express.Router}
 */
export default (db) => {
    // Маршрут получения всех данных с датчиков температуры
    router.get("/", async (req, res) => {
        try {
            const temperaturesData = await db.temperatures.findAll({
                include: [{
                    model: db.devices,
                    attributes: ['name']
                }]
            });
            res.json(temperaturesData);
        } catch (err) {
            res.status(500).json({ error: err });
        }
    });

    // Маршрут регистрации нового показателя температуры
    router.post("/", async (req, res) => {
        try {
            const temperature = await db.temperatures.create({
                deviceId: req.body.deviceId,
                value: req.body.value,
                createdAt: new Date()
            });
            res.status(201).json(temperature);
        } catch (err) {
            res.status(400).json({ error: "Cannot register this temperature" });
        }
    });

    // Маршрут удаления списка записей о температуре
    router.delete("/", async (req, res) => {
        try {
            const temperaturesUuids = req.body.temperaturesUuids; // Ожидается массив UUID
            if (!Array.isArray(temperaturesUuids) || temperaturesUuids.length === 0) {
                return res.status(400).json({ error: "Invalid or empty temperaturesUuids array" });
            }
            const deleteResult = await db.temperatures.destroy({
                where: {
                    uuid: temperaturesUuids
                }
            });
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ error: err });
        }
    });


    return router;
};
