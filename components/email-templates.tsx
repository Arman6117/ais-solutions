import Link from "next/link";
import React from "react";

export const AdminOTPEmail = ({ otp }: { otp: string }) => {
  return (
    <>
      <h2>
        Your OTP is: <strong>${otp}</strong>
      </h2>
      <p>It expires in 5 minutes.</p>
    </>
  );
};

export const ForgotPasswordEmail = ({ link }: { link: string }) => {
  return (
    <>
      <h2>
       <Link href={link}>Reset Your Password</Link>
      </h2>
      <p>It expires in 5 minutes.</p>
    </>
  );
};

