export interface StudentTable {
    _id:string,
    name:string,
    email:string,
    phone:string,
    gender:"male" | "female" | "other",
    batches:string[],
    feesStatus:"paid" | "partial" 
    createdAt: string,
}