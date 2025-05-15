import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

type ModuleCourseCard = {
  course: string;
};

const ModuleCourseCard = ({ course }: ModuleCourseCard) => {
  return (
    <Card className="">
      <CardContent className="w-full p-3">
        <CardHeader>
          <CardTitle>{course}</CardTitle>
        </CardHeader>
      </CardContent>
    </Card>
  );
};

export default ModuleCourseCard;
