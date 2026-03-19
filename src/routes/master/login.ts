import { Router } from "express";
import { masterLoginController } from "../../controller/login.controller";

const router = Router();

router.post("/", masterLoginController);

export default router;