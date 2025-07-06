"use server";

import { authClient } from "@/lib/auth-client";
import { parseStudentForm } from "@/lib/helpers/parse-student-registration";
import { uploadToCloudinary } from "@/lib/helpers/upload-to-cloudinary";

export const registerStudent = async (formData: FormData) => {
  try {
    const validatedData = await parseStudentForm(formData);
    const { email, gender, name, password, phone, profilePic, referralCode } =
    validatedData;
    console.log(profilePic)
    const profileUrl =
      profilePic instanceof File && profilePic.size > 0
        ? await uploadToCloudinary(validatedData.profilePic as File)
        : null;
console.log(profileUrl)
    const auth =await authClient.signUp.email({
      email: email,
      password: password,
      name: name,
      image: profileUrl?.url || "",
    });

    console.log(auth)
  } catch (error) {
    console.log(error)
  }
};
