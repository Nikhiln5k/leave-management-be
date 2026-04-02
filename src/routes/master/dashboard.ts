import { Router } from "express";
import * as dashDetails from "../../controller/dashboard.controller";
import * as jwtCont from "../../middlewares/jwt.middleware";
import * as roleValid from "../../middlewares/role.middleware";
import { asyncMiddleware } from "../../middlewares/async.middleware";
const router = Router();

router.get("/dashList", [
  jwtCont.isvalid,
  roleValid.authorize(["ADMIN"]),
  asyncMiddleware(dashDetails.getDashDedails),
]);

export default router;
