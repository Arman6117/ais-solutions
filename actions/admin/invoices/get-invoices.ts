"use server";

import { connectToDB } from "@/lib/db";
import { Invoice } from "@/models/invoice.model";
import { Mode } from "@/lib/types";

export const getInvoiceTable = async () => {
  try {
    await connectToDB();

    const invoices = await Invoice.find({})
      .select("_id studentId totalFees amountPaid status paymentHistory")
      .populate({
        path: "studentId",
        select: "name email courseIds batchIds moduleIds",
        populate: [
          { path: "courseIds", select: "name" },
          { path: "batchIds", select: "name" },
          { path: "moduleIds", select: "name" }
        ]
      })
      .sort({ createdAt: -1 });

    const formattedInvoices = invoices.map((invoice) => {
      const student = invoice.studentId;
      const lastPayment = invoice.paymentHistory?.[invoice.paymentHistory.length - 1];

      return {
        _id: `${invoice._id}`,
        studentName: student?.name || "Unknown",
        email: student?.email || "Unknown" as string,
        courses: student?.courseIds?.map((c:{name:string}) => c.name) || [] as string[],
        batches: student?.batchIds?.map((b:{name:string}) => b.name) || [] as string[],
        modules: student?.moduleIds?.map((m:{name:string}) => m.name) || [] as string[],
        totalFee: invoice.totalFees,
        amountPaid: invoice.amountPaid,
        status: invoice.status,
        lastPaymentMode: lastPayment?.mode || "N/A",
        lastPaymentDate: lastPayment?.dueDate || "N/A"
      };
    });

    return {
      success: true,
      data: formattedInvoices,
      message: "Invoices fetched successfully"
    };
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return {
      success: false,
      message: "Something went wrong while fetching invoices"
    };
  }
};
