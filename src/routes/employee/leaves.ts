import { Router } from "express";
import { createLeaves, getLeaves } from "../../controller/leaves.controller";
import { asyncMiddleware } from "../../middlewares/async.middleware";

const router = Router();
router.post("/leaveCreate", [
    asyncMiddleware(createLeaves)
]);
router.get("/leaveList", [
    asyncMiddleware(getLeaves)
]);

export default router;
