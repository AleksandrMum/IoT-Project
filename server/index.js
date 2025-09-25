import express from "express";
import cors from "cors";
import db from "./database/index.js";
import router from "./routes/index.js";

const SERVER_HOST = process.env.SERVER_HOST || "127.0.0.1";
const SERVER_PORT = process.env.SERVER_PORT || 8080;

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

db.client.sync({force: false, alter: false})
	.then(() => console.log("Database OK"))
	.catch((err) => console.error("Database ERROR:", err));

app.use("", router(db));

app.listen(SERVER_PORT, SERVER_HOST, () => {
	console.log(`Server started on http://${SERVER_HOST}:${SERVER_PORT}`);
});
