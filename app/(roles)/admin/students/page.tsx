
import React from "react";
import StudentTable from "./_components/student-table";

const StudentsPage = () => {
  return (
    <main className="p-3 w-full">
      <div className="flex w-full justify-between">
        <h1 className="text-5xl font-bold">Manage Students</h1>
      </div>
      <div className="mt-10">
        <StudentTable />
      </div>
    </main>
  );
};

export default StudentsPage;
