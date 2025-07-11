"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";

type CourseSyllabusCardProps = {
  mode: "view" | "edit";
  syllabusLink: string;
  setSyllabusLink: (link: string) => void;
};
const CourseSyllabusCard = ({
  mode,
  setSyllabusLink,
  syllabusLink,
}: CourseSyllabusCardProps) => {
  console.log(syllabusLink)
  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-3 bg-gray-50 border-b">
        <CardTitle className="text-xl">Course Syllabus</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          {mode === "view" ? (
            <div className="flex flex-col gap-2">
              <Link href={syllabusLink} className="text-lg font-semibold">
                {syllabusLink }

              </Link>
            </div>
          ) : (
            <Input
              type="text"
              value={syllabusLink}
              onChange={(e) => setSyllabusLink(e.target.value)}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseSyllabusCard;
