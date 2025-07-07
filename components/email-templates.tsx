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
