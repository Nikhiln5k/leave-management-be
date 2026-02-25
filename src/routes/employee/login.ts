import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  res.send("Employee login route");
});

export default router;