import { Router } from "express";
import { createLeaves } from "../../controller/leaves.controller";

const router = Router();
router.post("/leaveCreate", createLeaves);
export default router;
