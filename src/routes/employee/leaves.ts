import { Router } from "express";
import { createLeaves, getLeaves } from "../../controller/leaves.controller";

const router = Router();
router.post("/leaveCreate", createLeaves);
router.get("/leaveList", getLeaves);
export default router;
