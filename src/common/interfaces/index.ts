export interface Result {
    success: boolean;
    message: string;
    data?: any;
    error?: any;
}

export interface CreateUserCred {
    username: string;
    password: string;
    role: "ADMIN" | "EMPLOYEE" | "MANAGER";
}