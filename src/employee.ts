import express, { type Application } from "express";
import dotenv from "dotenv";
import compression from "compression";
import cors from "cors";

dotenv.config();

const app: Application = express();
app.use(express.json());

app.use(cors());
app.use(compression());

const port: number = Number(process.env.EMPLOYEE_PORT) || 5102;
app.listen(port, () => {
  console.info(`Employee is started at port ${port}`);
});
