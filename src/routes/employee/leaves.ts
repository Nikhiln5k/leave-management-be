import { Router } from "express";
import { createLeaves, getLeaves } from "../../controller/leaves.controller";
import multer from "multer";
import path from "path";

const router = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/medical/');
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  }
});
const upload = multer({ storage });
router.post("/leaveCreate", upload.single("doc"), createLeaves);
// router.post("/leaveCreate", createLeaves);
router.get("/leaveList", getLeaves);
export default router;