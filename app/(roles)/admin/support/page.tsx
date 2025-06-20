import React from "react";
import Support from "./_components/support";
import { Button } from "@/components/ui/button";
import CreateSupportDepartmentModal from "./_components/create-support-department-modal";

const SupportPage = () => {
  return (
    <main className="p-3 w-full">
      <div className="flex w-full justify-between">
        <h1 className="text-5xl font-bold">Support Contacts</h1>
        <CreateSupportDepartmentModal />
      </div>
      <div className="mt-10">
        <Support />
      </div>
    </main>
  );
};

export default SupportPage;
