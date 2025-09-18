import express from "express";
import cors from "cors";
import db from "./database/index.js";

const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.use(express.json());

db.client.sync({force: false, alter: false})
	.then(() => console.log("Database connected!"))
	.catch((err) => console.error("Database connection error:", err));

// Получить все устройства
app.get("/devices", async (req, res) => {
	try {
		const devices = await db.devices.findAll();
		res.json(devices);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Получить все команды
app.get("/commands", async (req, res) => {
	try {
		const commands = await db.commands.findAll();
		res.json(commands);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Добавить новое устройство
app.post("/devices", async (req, res) => {
	try {
		const device = await db.devices.create(req.body);
		res.status(201).json(device);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// Добавить новую команду
app.post("/commands", async (req, res) => {
	try {
		const command = await db.commands.create(req.body);
		res.status(201).json(command);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
