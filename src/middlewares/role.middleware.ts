import resHandler from "../common/helpers/responseHandler";

export const authorize = (allowedRoles: string[]) => {
  return (req: any, res: any, next: any) => {
    if (!req.userData || !req.userData.role) {
      return resHandler.forbiddenRes(res, "Access denied");
    }

    if (!allowedRoles.includes(req.userData.role)) {
      return resHandler.forbiddenRes(res, "Access denied");
    }

    next();
  };
};
