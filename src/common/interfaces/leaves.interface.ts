export interface CreateLeaves {
    userId: number;
    startDate: Date;
    endDate: Date;
    type: "SICK" | "CASUAL" | "PAID";
    reason: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    managerComment: string;
    apiName?: string;
    doc?: string;
}