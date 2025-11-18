import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { nextCookies } from "better-auth/next-js";
import { createAuthMiddleware } from "better-auth/api";
import { Resend } from "resend";

// Initialize Prisma Client once
const prisma = new PrismaClient();

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Email sending function for password reset
const sendPasswordResetEmail = async (email: string, url: string) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "AIS|Applied Insights <onboarding@resend.dev>", // Change to your verified domain
      to: [email],
      subject: "Reset Your Password",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background-color: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .button { 
                display: inline-block; 
                padding: 12px 24px; 
                background-color: #4F46E5; 
                color: white !important; 
                text-decoration: none; 
                border-radius: 6px; 
                margin: 20px 0;
                font-weight: 600;
              }
              .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #6b7280; }
              .link { word-break: break-all; color: #4F46E5; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Password Reset Request</h1>
              </div>
              <div class="content">
                <p>Hello,</p>
                <p>We received a request to reset your password. Click the button below to create a new password:</p>
                <div style="text-align:center;">
                  <a href="${url}" class="button">Reset Password</a>
                </div>
                <p>Or copy and paste this link into your browser:</p>
                <p class="link">${url}</p>
                <p><strong>This link will expire in 10 minutes.</strong></p>
                <p>If you didn't request a password reset, please ignore this email.</p>
              </div>
              <div class="footer">
                <p>© ${new Date().getFullYear()} AIS. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Error sending email:", error);
      return { success: false, error };
    }

    return { success: true, data };
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
    sendOnSignUp: false, // Set to true if you want email verification on signup
    autoSignInAfterVerification: true,
    // Optional: Add email verification sender
    async sendVerificationEmail({ user, url }) {
      // Implement if you need email verification
      console.log("Verification email for:", user.email, url);
    },
  },

  plugins: [
    nextCookies(),
  ],

  // Session configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },

  // Account configuration
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"], // Add providers you use
    },
  },

  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      try {
        if (ctx.path === "/sign-in/email") {
          const { email } = ctx.body as { email: string };
          
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
        return {
          success: false,
          message: "An internal server error occurred.",
        };
      }
    }),
  },
});
