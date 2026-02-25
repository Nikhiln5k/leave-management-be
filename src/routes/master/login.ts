import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  res.send("Master login route");
});

export default router;