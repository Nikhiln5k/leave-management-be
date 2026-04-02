import { Router } from "express";
import { loginController } from "../../controller/login.controller";
import { asyncMiddleware } from "../../middlewares/async.middleware";

const router = Router();

router.post("/", [
    asyncMiddleware(loginController)
]);

export default router;
