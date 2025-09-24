import express from "express";
import cors from "cors";
import db from "./database/index.js";
import router from "./routes/index.js";

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || "127.0.0.1";

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

db.client.sync({force: false, alter: false})
	.then(() => console.log("Database OK"))
	.catch((err) => console.error("Database ERROR:", err));

app.use("", router(db));

app.listen(PORT, HOST, () => {
	console.log(`Server started on http://${HOST}:${PORT}`);
});
