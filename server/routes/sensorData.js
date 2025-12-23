import express from "express";
import '../database/typedef_db.js';

/**
 * Маршруты для работы с данными датчиков
 * @param {DatabaseType} db - объект базы данных
 * @returns {express.Router}
 */
export default (db) => {
    const router = express.Router();

    /**
     * GET /sensor-data
     */
    router.get("/", async (req, res) => {
        try {
            const sensorData = await db.sensorData.findAll({
                include: [
                    {
                        model: db.sensor,
                        attributes: ['sensorId', 'sensorName', 'sensorType', 'location', 'unitOfMeasure']
                    }
                ],
                order: [['timestamp', 'DESC']],
                limit: 50
            });

            res.json({
                success: true,
                count: sensorData.length,
                data: sensorData
            });
        } catch (error) {
            console.error('Error fetching sensor data:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    });

    /**
     * GET /sensor-data/:sensorId
     */
    router.get("/:sensorId", async (req, res) => {
        try {
            const { sensorId } = req.params;

            const sensorData = await db.sensorData.findAll({
                where: { sensorId },
                include: [
                    {
                        model: db.sensor,
                        attributes: ['sensorId', 'sensorName', 'sensorType', 'location', 'unitOfMeasure']
                    }
                ],
                order: [['timestamp', 'DESC']],
                limit: 100
            });

            if (sensorData.length === 0) {
                return res.status(404).json({
                    success: false,
                    error: 'No data found for this sensor'
                });
            }

            res.json({
                success: true,
                count: sensorData.length,
                data: sensorData
            });
        } catch (error) {
            console.error('Error fetching sensor data:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    });

    /**
     * POST /sensor-data
     * Body: { sensorId, dataType, value }
     */
    router.post("/", async (req, res) => {
        try {
            const { sensorId, dataType, value } = req.body;

            // Валидация
            if (!sensorId || !dataType || value === undefined || value === null) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing required fields: sensorId, dataType, value'
                });
            }

            // Проверяем, существует ли датчик
            const sensor = await db.sensor.findByPk(sensorId);
            if (!sensor) {
                return res.status(404).json({
                    success: false,
                    error: `Sensor with ID ${sensorId} not found`
                });
            }

            // Создаем запись
            const newData = await db.sensorData.create({
                sensorId,
                dataType,
                value: parseFloat(value),
                timestamp: new Date()
            });

            res.status(201).json({
                success: true,
                message: 'Sensor data recorded successfully',
                data: newData
            });
        } catch (error) {
            console.error('Error creating sensor data:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    });

    /**
     * POST /sensor-data/batch
     * Body: { readings: [{ sensorId, dataType, value }, ...] }
     */
    router.post("/batch", async (req, res) => {
        try {
            const { readings } = req.body;

            if (!Array.isArray(readings) || readings.length === 0) {
                return res.status(400).json({
                    success: false,
                    error: 'Body must contain "readings" array with at least one entry'
                });
            }

            const timestamp = new Date();
            const results = [];
            const errors = [];

            for (let i = 0; i < readings.length; i++) {
                try {
                    const { sensorId, dataType, value } = readings[i];

                    if (!sensorId || !dataType || value === undefined || value === null) {
                        errors.push({
                            index: i,
                            error: 'Missing required fields: sensorId, dataType, value'
                        });
                        continue;
                    }

                    // Проверяем датчик
                    const sensor = await db.sensor.findByPk(sensorId);
                    if (!sensor) {
                        errors.push({
                            index: i,
                            error: `Sensor with ID ${sensorId} not found`
                        });
                        continue;
                    }

                    const newData = await db.sensorData.create({
                        sensorId,
                        dataType,
                        value: parseFloat(value),
                        timestamp
                    });

                    results.push({
                        index: i,
                        success: true,
                        data: newData
                    });
                } catch (error) {
                    errors.push({
                        index: i,
                        error: error.message
                    });
                }
            }

            res.status(201).json({
                success: errors.length === 0,
                totalProcessed: readings.length,
                successCount: results.length,
                errorCount: errors.length,
                data: results,
                errors: errors.length > 0 ? errors : undefined
            });
        } catch (error) {
            console.error('Error in batch sensor data:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    });

    /**
     * DELETE /sensor-data/:dataId
     */
    router.delete("/:dataId", async (req, res) => {
        try {
            const { dataId } = req.params;

            const deleted = await db.sensorData.destroy({
                where: { dataId }
            });

            if (deleted === 0) {
                return res.status(404).json({
                    success: false,
                    error: `Data with ID ${dataId} not found`
                });
            }

            res.json({
                success: true,
                message: 'Sensor data deleted successfully'
            });
        } catch (error) {
            console.error('Error deleting sensor data:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    });

    return router;
};
