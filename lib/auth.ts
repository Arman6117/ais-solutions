import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { nextCookies } from "better-auth/next-js";
import { createAuthMiddleware } from "better-auth/api";

// Initialize Prisma Client once
const prisma = new PrismaClient();

export const auth = betterAuth({
  // Use Prisma as the database adapter for the auth library
  database: prismaAdapter(prisma, {
    provider: "mongodb", // This tells Prisma adapter how to structure things for MongoDB
  }),

  emailAndPassword: {
    autoSignIn: false,
    enabled: true,
    requireEmailVerification: false,
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    // TODO: Implement your email sending logic here
    // sendVerificationEmail: async ({ user, token }) => { ... },
  },

  plugins: [nextCookies()],

  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      try {
        if (ctx.path === "/sign-in/email") {
          const { email } = ctx.body as { email: string };
          
          // FIX: Use Prisma to check if the student exists
          const existingStudent = await prisma.user.findUnique({
            where: { email },
          });

          if (!existingStudent) {
            return {
              success: false,
              message: "Student not found. Please register first.",
            };
          }
        }

        if (ctx.path === "/sign-up/email") {
          const { email } = ctx.body as { email: string };
          
          // FIX: Use Prisma to check if the student already exists
          const existingStudent = await prisma.user.findUnique({
            where: { email },
          });

          if (existingStudent) {
            return {
              success: false,
              message: "Student with this email already exists. Please login.",
            };
          }
        }
      } catch (error) {
        console.error("❌ Auth middleware error:", error);
        // FIX: NEVER throw an error here. Always return a response.
        return {
          success: false,
          message: "An internal server error occurred.",
          // This will be converted to a proper NextResponse with a 500 status
        };
      }
    }),
  },
});