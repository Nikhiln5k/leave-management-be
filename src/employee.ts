import express, { type Application } from "express";
import dotenv from "dotenv";
import compression from "compression";
import cors from "cors";
import db from "./db";
import routes from "./routes/employee"
import common from "./common";

dotenv.config();

const app: Application = express();
app.use(express.json());

function startServer() {
  const port: number = Number(process.env.EMPLOYEE_PORT) || 5102;
  try {
    db.init();
    app.listen(port, () => {
      console.info(`Employee is started at port ${port}`);
    });
  } catch (error: any) {
    console.error("Failed to start employee:", error.message);
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
