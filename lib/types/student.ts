export interface StudentTable {
    _id:string,
    name:string,
    email:string,
    phone:string,
    gender:"male" | "female" | "other",
    batches:string[],
    feesStatus:"paid" | "partial" | "unpaid", 
    createdAt: string,
}

export interface StudentData {
    _id: string;
    name: string;
    email: string;
    phone: string;
    profilePic:string
    gender:"male" | "female" | "other";
    batches: string[];
    feesStatus: "paid" | "partial" | "unpaid";
    createdAt: string;
    updatedAt: string;
    courses: {
        courseId: string;
        moduleId: string[];
        approvedAt: Date | null;
        isApproved: boolean;
    }
    invoices: string[];
    referralCode: string,
    totalFees?:number
    remainingFee?:number
    amountPaid?:number
}

