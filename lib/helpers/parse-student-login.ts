// lib/parsers/parseStudentRegistration.ts
import { z } from "zod";

export const studentLoginSchema = z.object({
  
  email: z.string().email(),

  password: z.string().min(6),
});

export async function parseStudentLoginForm(formData: FormData) {
  const raw = {
    
    email: formData.get("email"),

    password: formData.get("password"),
  };

  return studentLoginSchema.parse(raw);
}
