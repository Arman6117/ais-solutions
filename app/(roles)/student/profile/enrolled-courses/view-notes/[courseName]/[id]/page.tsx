import { Button } from "@/components/ui/button";
import { dummyEnrolledCourseData } from "@/lib/static";
import Link from "next/link";
import React from "react";
import ViewNotes from "../../_components/view-notes";

type ViewNotesPageProps = {
  params: {
    courseName: string;
    id: string;
  };
};
const ViewNotesPage = async ({ params }: ViewNotesPageProps) => {
  const courseName = decodeURIComponent( (await params).courseName);
  const id = (await params).id;

  const foundChapter = dummyEnrolledCourseData.modules
    .flatMap((module) => module.chapters)
    .find((chapter) => chapter.id === Number(id));
  
  if (!foundChapter) {
    return (
      <div className="w-full h-full flex flex-col gap-6 justify-center items-center">
        <h1 className="text-4xl font-medium">No Chapter Found!</h1>
        <Button className="bg-primary-bg cursor-pointer" size={"lg"}>
          <Link className="" href={"/student/profile/enrolled-courses"}>Back</Link>
        </Button>
      </div>
    );
  }

  return <ViewNotes courseName={courseName} notes={foundChapter.notes}/>
};

export default ViewNotesPage;
