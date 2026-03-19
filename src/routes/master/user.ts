import { Router } from "express";
import * as userCont from "../../controller/user.controller";

const router = Router();

router.post("/create", userCont.createUser);
console.log('route')

export default router;