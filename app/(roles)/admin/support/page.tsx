import React from "react";
import Support from "./_components/support";

const SupportPage = () => {
  return (
    <main className="p-3 w-full">
      <div className="flex w-full justify-between">
        <h1 className="text-5xl font-bold">Support Contacts</h1>
      </div>
      <div className="mt-10">
        <Support />
      </div>
    </main>
  );
};

export default SupportPage;
