import express, { type Application } from 'express';

const app: Application = express();

const port: number = Number(process.env.PORT) || 5100;
app.listen(port, () => {
    console.info(`Server is running on port ${port}`);
})