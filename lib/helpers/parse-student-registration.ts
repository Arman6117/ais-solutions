// lib/parsers/parseStudentRegistration.ts
import { z } from "zod"

export const studentSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^\d{10}$/),
  gender: z.enum(["male", "female", "other"]),
  password: z.string().min(6),
  confirmPassword: z.string().min(1),
  referralCode: z.string().optional(),
  profilePic: z.any().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match"
})

export async function parseStudentForm(formData: FormData) {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    gender: formData.get("gender"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    referralCode: formData.get("referralCode") || undefined,
    profilePic: formData.get("profilePic")
  }
console.log(raw)
  return studentSchema.parse(raw)
}
