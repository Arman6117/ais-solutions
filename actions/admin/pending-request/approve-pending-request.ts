"use server";

import { connectToDB } from "@/lib/db";
import { ApprovePendingRequestPayload } from "@/lib/types/pending-request.type";
import { Student } from "@/models/student.model";
import { Invoice } from "@/models/invoice.model";
import { Course } from "@/models/course.model";
import { Batch } from "@/models/batch.model";
import { Module } from "@/models/module.model";
import { PendingRequest } from "@/models/pending-request.model";

export const approvePendingRequest = async (
  requestId: string,
  payload: ApprovePendingRequestPayload
): Promise<{ success: boolean; message: string; }> => {
  console.log("Approving Pending Request with payload:", payload);
  console.log("Pending Request ID:", requestId);
  
  const {
    email,
    courseName,
    amountPaid,
    batch,
    batchMode,
    courseId,
    mode,
    modules,
    status,
    totalFees,
    dueDate,
  } = payload;

  try {
    // Connect to the database
    await connectToDB();

    // Input validation
    if (!requestId || !email || !courseId || !batch || !modules.length) {
      return { success: false, message: "Missing required fields" };
    }

    // Validate that the pending request exists before processing
    const pendingRequest = await PendingRequest.findById(requestId);
    if (!pendingRequest) {
      return { success: false, message: "Pending request not found" };
    }

    // Find the student by email
    const student = await Student.findOne({ email }).select("_id courses").exec();
    if (!student) {
      return { success: false, message: "Student not found" };
    }
    const studentId = student._id; // This is already a string in your schema

    // Check if student is already enrolled in this course
    const alreadyEnrolled = student.courses?.some(
      (course:{courseId:string}) => course.courseId.toString() === courseId.toString()
    );
    if (alreadyEnrolled) {
      return { 
        success: false, 
        message: "Student is already enrolled in this course" 
      };
    }

    // Validate that the course, batch, and modules exist
    const [courseExists, batchExists] = await Promise.all([
      Course.findById(courseId).select("_id courseName"),
      Batch.findById(batch).select("_id name")
    ]);

    if (!courseExists) {
      return { success: false, message: "Course not found" };
    }
    if (!batchExists) {
      return { success: false, message: "Batch not found" };
    }

    // Validate modules exist
    const moduleCount = await Module.countDocuments({ _id: { $in: modules } });
    if (moduleCount !== modules.length) {
      return { success: false, message: "One or more modules not found" };
    }

    // Calculate remaining fees
    const remainingFee = Math.max(0, totalFees - amountPaid);

    // Validate payment logic
    if (status === "Paid" && remainingFee > 0) {
      return { 
        success: false, 
        message: "Invalid payment: status is 'Paid' but remaining fees exist" 
      };
    }
    
    if (status === "Partially Paid" && (amountPaid <= 0 || amountPaid >= totalFees)) {
      return { 
        success: false, 
        message: "Invalid payment: 'Partially Paid' requires amount between 0 and total fees" 
      };
    }

    if (status === "Due" && amountPaid > 0) {
      return { 
        success: false, 
        message: "Invalid payment: 'Due' status should have zero amount paid" 
      };
    }

    // Validate due date for non-paid statuses
    if ((status === "Due" || status === "Partially Paid") && !dueDate) {
      return { 
        success: false, 
        message: "Due date is required for non-paid status" 
      };
    }

    try {
      // Construct the nested courseDetails and paymentHistory objects
      const courseDetails = [
        {
          courseId: courseId,
          modules: modules,
          totalFees: totalFees,
          remainingFees: remainingFee,
          amountPaid: amountPaid,
          dueDate: status !== "Paid" ? dueDate : undefined,
          status: status,
          mode: batchMode.toLowerCase(), // matches your enum: ["offline", "hybrid", "online"]
        },
      ];

      // Only create payment history if amount was paid
      const paymentHistory = amountPaid > 0 ? [
        {
          amount: amountPaid,
          courseName: courseName,
          modules: modules,
          totalFees: totalFees, // Added this required field from your schema
          dueDate: status !== "Paid" ? dueDate : undefined,
          notes: "Initial payment during course approval",
          mode: mode, // This matches your enum: ["UPI", "Cash", "Card", "Other"]
        },
      ] : [];

      // Create the invoice document with nested data
      const invoicePayload = {
        studentId: studentId, // String type as per your schema
        totalFees: totalFees,
        remainingFees: remainingFee,
        amountPaid: amountPaid,
        courseDetails: courseDetails,
        paymentHistory: paymentHistory,
        status: status,
      };

      const invoice = new Invoice(invoicePayload);
      await invoice.save();

      // Update the Student model to add the new course, batch, and invoice
      await Student.findByIdAndUpdate(studentId, {
        $addToSet: {
          courses: {
            courseId: courseId,
            moduleId: modules, // Array as per your schema
            approvedAt: new Date(),
            isApproved: true,
          },
          invoices: invoice._id,
        },
        $push: {
          batches: { 
            batchId: batch, 
            mode: batchMode.toLowerCase(), // matches enum: ["offline", "online", "hybrid"]
            enrolledAt: new Date() 
          },
        },
        $set: { 
          feeStatus: status.toLowerCase(), // matches enum: ["paid", "partially paid", "due"]
        },
      });

      // Update the Course model - note: your schema uses 'studentsEnrolled' not 'students'
      await Course.findByIdAndUpdate(courseId, { 
        $addToSet: { studentsEnrolled: studentId }, // String type as per your schema
        $inc: { numberOfStudents: 1 }
      });

      // Update the Batch model - uses 'students' array
      await Batch.findByIdAndUpdate(batch, { 
        $addToSet: { students: studentId }, // String type as per your schema
      });

      // Update each module with the student ID
      await Promise.all(
        modules.map(async (moduleId) => {
          await Module.findByIdAndUpdate(moduleId, {
            $addToSet: { students: studentId }, // String type as per your schema
          });
        })
      );

      // Delete the pending request after successful approval
      const deletionResult = await PendingRequest.findByIdAndDelete(requestId);
      if (!deletionResult) {
        console.warn("Pending request not found for deletion:", requestId);
        // Continue execution since enrollment was successful
      }

      return {
        success: true,
        message: `Course enrollment approved successfully for ${email}`,
      
      };

    } catch (transactionError) {
      console.error("Transaction failed:", transactionError);
      throw transactionError;
    }
    
  } catch (error) {
    console.error("Failed to approve pending request:", error);
    
    // Provide more specific error messages based on error type
    if (error instanceof Error) {
      if (error.name === 'ValidationError') {
        return { 
          success: false, 
          message: "Data validation failed. Please check all required fields." 
        };
      }
      if (error.name === 'MongoError' && error.message.includes('duplicate')) {
        return { 
          success: false, 
          message: "Duplicate entry detected. Student may already be enrolled." 
        };
      }
      if (error.name === 'CastError') {
        return { 
          success: false, 
          message: "Invalid ID format provided." 
        };
      }
    }
    
    return {
      success: false,
      message: "Something went wrong while processing the request. Please try again.",
    };
  }
};