"use server"

import { connectToDB } from "@/lib/db"
import { Batch } from "@/models/batch.model";
import { isValidObjectId } from "mongoose";
import  {ObjectId} from 'mongodb'
import { BatchModules, BatchType, Mode } from "@/lib/types";

export const getBatchById = async(batchId:string) => {
    try {
        await connectToDB();
        if(!batchId) {
            return {success:false,message:"No id is provided"}
        }
        if(!isValidObjectId(batchId)) {
            return {success:false , message:"Not valid batch id"}
        }

        const batch =await Batch.findById(new ObjectId(batchId))
        if(!batch) {
            return {success:false, message:"No batch found"}
        }
        const formattedBatch = {
            _id: `${batch._id}`,
            name: batch.name as string,
            description: batch.description as string,
            startDate: batch.startDate as string,
            endDate: batch.endDate as string,
            status: batch.status as "Upcoming" | "Ongoing" | "Completed",
            type: batch.type as BatchType,
            groupLink: batch.groupLink as string,
            instructors: [] as string[], // explicitly typed
            meetings: [] as string[],    // explicitly typed
            mode: batch.mode as Mode,
            modules: (batch.modules as BatchModules[]).map((mod) => ({
              id: mod.id?.toString?.() ?? "",
              name: mod.name,
              startDate: mod.startDate,
              endDate: mod.endDate,
              instructor: mod.instructor,
              status: mod.status,
              numberOfStudent: mod.numberOfStudent,
            })),
            courseId: `${batch.courseId}`,
            notes: [] as string[],      
            students: [] as string[],   
          };
          
      
        return {success:true,data:formattedBatch}
    } catch (error) {
        console.log(error)
        return {success:false,data:null}
    }
}