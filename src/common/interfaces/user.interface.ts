
export interface CreateUser {
    userId: number;
    name: string;
    email: string;
    username: string;
    password: string;
    roleId: number;
    apiName?: string;
}