import db from "../db";
import { fetchMenu } from "../models/menuPermission.model";

export const fetchMenuPermissions = async (
  roleId: number,
): Promise<string[]> => {
  const connection = await db.getConnection();
  const result = await fetchMenu(connection, roleId);

  return result.map((r: any) => {
    return { menuName: r.menuName, path: r.path, addBtn: r.addBtn };
  });
};
