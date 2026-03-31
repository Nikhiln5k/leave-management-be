import { Router } from "express";
import * as dashDetails from "../../controller/dashboard.controller";
const router = Router();

router.get("/dashList", dashDetails.getDashDedails );

export default router;