import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { nextCookies } from "better-auth/next-js";
import { createAuthMiddleware } from "better-auth/api";
import emailjs from "@emailjs/nodejs";

// Initialize Prisma Client once
const prisma = new PrismaClient();

// Initialize Resend
const sendPasswordResetEmail = async (email: string, url: string) => {
  try {
    const templateParams = {
      email: email,
      link: url,
    };

    const res = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID!,
      process.env.EMAILJS_TEMPLATE_ID!,
      templateParams,
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY!,
        privateKey: process.env.EMAILJS_PRIVATE_KEY!,
      }
    );

    if (res.status !== 200) {
      console.error("Error sending email:", res);
      return { success: false, error: res.text };
    }

    return { success: true, data: res };
  } catch (error) {
    console.error("Error in sendPasswordResetEmail:", error);
    return { success: false, error };
  }
};


export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),

  emailAndPassword: {
    autoSignIn: false,
    enabled: true,
    requireEmailVerification: false,
    async sendResetPassword({ user, url }) {
      await sendPasswordResetEmail(user.email, url);
    },
  },

  emailVerification: {
    sendOnSignUp: false,
    autoSignInAfterVerification: true,
    async sendVerificationEmail({ user, url }) {
      console.log("Verification email for:", user.email, url);
    },
  },

  plugins: [
    nextCookies(),
  ],

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
    },
  },

  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      try {
        // 1. Sign In Check
        if (ctx.path === "/sign-in/email") {
          const { email } = ctx.body as { email: string };
          
          const existingStudent = await prisma.user.findUnique({
            where: { email: email.toLowerCase() }, // Ensure case-insensitive check
          });

          if (!existingStudent) {
            // ERROR: Return a Response object to block execution
            return {
                response: new Response(
                    JSON.stringify({ message: "User not found. Please register first." }),
                    { 
                        status: 400,
                        headers: { "Content-Type": "application/json" } 
                    }
                )
            };
          }
        }

        // 2. Sign Up Check
        if (ctx.path === "/sign-up/email") {
          const { email } = ctx.body as { email: string };
          
          const existingStudent = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
          });

          if (existingStudent) {
             // ERROR: Return a Response object to block execution
             return {
                response: new Response(
                    JSON.stringify({ message: "User with this email already exists. Please login." }),
                    { 
                        status: 400,
                        headers: { "Content-Type": "application/json" } 
                    }
                )
            };
          }
        }

        // SUCCESS: Explicitly return context to continue execution
        return { context: ctx };

      } catch (error) {
        console.error("❌ Auth middleware error:", error);
        // SERVER ERROR: Return a Response object
        return {
             response: new Response(
                JSON.stringify({ message: "An internal server error occurred." }),
                { 
                    status: 500,
                    headers: { "Content-Type": "application/json" } 
                }
            )
        };
      }
    }),
  },
});
