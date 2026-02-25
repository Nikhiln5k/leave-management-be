import express, { type Application } from "express";
import dotenv from "dotenv";
import compression from "compression";
import cors from "cors";
import db from "./db";
import routes from "./routes/master/index";
import common from "./common/index";

dotenv.config();

const app: Application = express();
app.use(express.json());

// Call init synchronously before anything else
db.init().catch((err) => {
  console.error("Database initialization failed:", err);
  process.exit(1);
});
async function startServer() {
  const port: number = Number(process.env.MASTER_PORT) || 5101;
  try {
    await db.init();
    app.listen(port, () => {
      console.info(`Master is started at port ${port}`);
    });
  } catch (error: any) {
    console.error("Failed to start master:", error.message);
  }
}

app.use(cors());
app.use(compression());

startServer();

app.use("/api", routes);

app.use((req, res) => {
  res
    .status(common.notFound)
    .send("API Request Not Valid. Please check Again.");
});
