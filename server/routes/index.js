import express from "express";
import '../database/typedef_db.js';

// ==================== Импорт маршрутов ====================

import sensorDataRouter from "./sensorData.js";

// =================== Настройка маршрутов ==================

/**
 * Инициализирует маршруты приложения
 * @param {DatabaseType} db - объект базы данных с моделями (house, user, device, sensor, scenario, log и т.д.)
 * @returns {express.Router} настроенный express router с подмаршрутами
 */
export default (db) => {
    const router = express.Router();

    router.get("/", (req, res) => {
        res.send("<h1>Welcome to the IoT Project API</h1>");
    });

    // Подключаем маршруты
    router.use("/sensor-data", sensorDataRouter(db));

    return router;
};
