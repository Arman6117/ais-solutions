import { authClient } from "@/lib/auth-client";
import { parseStudentLoginForm } from "@/lib/helpers/parse-student-login";
import { ZodError } from "zod";

export const loginStudent = async (data: FormData) => {
  try {
    // await connectToDB();
    const validatedData = await parseStudentLoginForm(data);
    const { email, password } = validatedData;
    if (!email || !password) {
      return {
        success: false,
        error: { email: "Email is required", password: "Password is required" },
      };
    }
    // const existingStudent = await Student.findOne({email})
    // if(!existingStudent) {
    //   return { success: false, message: "Student not found" };
    // }
    const auth = await authClient.signIn.email({
      email: email,
      password: password,
    });
    console.log(auth);
    if (auth.error) {
      return { success: false, message: auth.error.message };
    }
    return { success: true, message: "Login successful" };
  } catch (error) {
    if (error instanceof ZodError) {
      const fieldErrors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const path = err.path[0] as string;
        fieldErrors[path] = err.message;
      });

      return { success: false, error: fieldErrors };
    }
    console.log(error);
    return { success: false, message: "Something went wrong." };
  }
};
