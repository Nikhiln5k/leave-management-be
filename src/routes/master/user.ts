import { Router } from "express";
import * as userCont from "../../controller/user.controller";

const router = Router();

router.post("/create", userCont.createUser);

export default router;