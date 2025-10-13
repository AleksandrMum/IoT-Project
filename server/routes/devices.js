import express from "express";
import '../database/typedef_db.js';
const router = express.Router();

/**
 * @param { database } db
 * @returns {express.Router}
 */
export default (db) => {
    // Маршрут получения всех устройств
    router.get("/", async (req, res) => {
        try {
            const devices = await db.devices.findAll();
            res.json(devices);
        } catch (err) {
            res.status(500).json({ error: err });
        }
    });

    // Маршрут регистрации устройства без UUID в EEPROM
    router.post("/register", async (req, res) => {
        try {
            const device = await db.devices.create({
                name: `${req.body.type}-${Math.floor(Math.random() * 10000)}`,
                type: req.body.type,
                location: null,
                isActive: true,
                createdAt: new Date(),
                updatedAt: null
            });
            res.status(201).json({ deviceId: device.uuid });
        } catch (err) {
            res.status(400).json({ error: "Cannot register this device" });
        }
    });

    // Маршрут обновления информации об устройстве по UUID
    router.patch("/:deviceid", async (req, res) => {
        try {
            const { deviceid } = req.params;
            const { name, location, isActive } = req.body;
            const device = await db.devices.findOne({ where: { uuid: deviceid } });
            if (!device) {
                return res.status(404).json({ error: "Device not found" });
            }
            if (name && name.length > 0) {
                device.name = name;
            }
            if (location && location.length > 0) {
                device.location = location;
            }
            if (isActive !== undefined) {
                device.isActive = isActive;
            }
            device.updatedAt = new Date();
            await device.save();
            res.status(200).json({ message: "Device updated successfully" });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    return router;
};
