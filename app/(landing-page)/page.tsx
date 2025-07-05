import Navbar from "@/components/navbar";
import { connectToDB } from "@/lib/db";
import Image from "next/image";

export default async function Home() {
  connectToDB()
  return (
   <main className="flex flex-col">
    {/* <Navbar/> */}
   </main>
  );
}
