
export interface CreateUser {
    userId: number;
    name: string;
    email: string;
    username: string;
    password: string;
    role: "ADMIN" | "EMPLOYEE" | "MANAGER";
    apiName?: string;
}