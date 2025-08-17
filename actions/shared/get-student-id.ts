'use server'

import { connectToDB } from "@/lib/db"
import { Student } from "@/models/student.model";

export const getStudentId = async (email: string):Promise<string | null> => {
    console.log(email)
    try {
        await  connectToDB();
        const studentId = await Student.findOne({email}).select('_id').exec()
        console.log(studentId);
        if (!studentId) {
           return null
        }
        return studentId;
    } catch (error) {
        console.log(error);
        return null;
    }
}