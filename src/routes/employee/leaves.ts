import { Router } from "express";
import { createLeaves, getLeaves } from "../../controller/leaves.controller";
import { handleMulterError } from "../../middlewares/upload.middleware";
import { uploadToCloud } from "../../config/multer.config";
import { asyncMiddleware } from "../../middlewares/async.middleware";

const router = Router();

router.post("/leaveCreate", [
  uploadToCloud("medical").single("doc"),
  handleMulterError,
  asyncMiddleware(createLeaves),
]);
// router.post("/leaveCreate", createLeaves);
router.get("/leaveList", getLeaves);
export default router;
