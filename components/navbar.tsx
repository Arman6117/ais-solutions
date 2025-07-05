import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex justify-between w-full">
      <div
        className="
    "
      >
        Other links
      </div>
      <div className="flex gap-4">
        <Link href={"/auth/register"}>
          <Button className="bg-primary-bg">Register</Button>
        </Link>
        <Link href={"/auth/login"}>
          <Button variant={'outline'}>Login</Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
