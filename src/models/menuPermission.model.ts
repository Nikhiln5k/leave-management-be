
export const fetchMenu = async (connection: any, roleId: number) => {
    try {
        const [rows] = await connection.execute(
            `SELECT m.menuName, mp.addBtn, mp.path FROM menu_permission mp
             INNER JOIN menu m ON mp.menuId = m.id WHERE mp.roleId = ? AND mp.isDelete = 0`,
            [roleId]
        );
        return rows;

    } catch (error) {
        console.error("Error fetching menu permissions", error);
        return [];
    }
}