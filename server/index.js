import express from "express";
import cors from "cors";
import db from "./database/index.js";
import router from "./routes/index.js";

const SERVER_HOST = process.env.SERVER_HOST || "127.0.0.1";
const SERVER_PORT = process.env.SERVER_PORT || 8080;

const createApp = async () => {
	const app = express();
	app.use(cors({ origin: true, credentials: true }));
	app.use(express.json());

	await db.client.sync({force: false, alter: true})
		.then(() => console.log("Database OK"))
		.catch((err) => {
			console.error("Database ERROR:", err)
			process.exit(1);
		});

	app.use("", router(db));

	app.listen(SERVER_PORT, SERVER_HOST, () => {
		console.log(`Server started on http://${SERVER_HOST}:${SERVER_PORT}`);
	});

	return app;
}

createApp();
