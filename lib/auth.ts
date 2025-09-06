import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { nextCookies } from "better-auth/next-js";
import { createAuthMiddleware } from "better-auth/api";
import { connectToDB } from "./db";
import { Student } from "@/models/student.model";

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),
  emailAndPassword: {
    autoSignIn: false,
    enabled: true,
    requireEmailVerification: false,
  },
  //TODO:Add send email function
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    // sendVerificationEmail: async ({ user, token }) => {
    //   const verificationUrl = `${process.env.BETTER_AUTH_UR}/api/auth/verify?token=${token}&callbackUrl=${process.env.EMAIL_VERIFICATION_CALLBACK_URL}`;
    // },
  },

  plugins: [nextCookies()],
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      try {
        if (ctx.path === "/sign-in/email") {
          const { email } = ctx.body as { email: string; password: string };
          await connectToDB();

          const existingStudent = await Student.findOne({ email });
          if (!existingStudent) {
            return {
              success: false,
              message: "Student not found. Please register first.",
            };
          }
        }
        if (ctx.path === "/sign-up/email") {
          const { email } = ctx.body as {
            email: string;
            password: string;
          };
          await connectToDB();
          const existingStudent = await Student.findOne({ email });
          if (existingStudent) {
            return {
              success: false,
              message: "Student with this email already exists. Please login.",
            };
          }
        }
      } catch (error) {
        console.log("❌ Auth middleware error:", error);
        throw error; 
      }
    }),
  },
});
