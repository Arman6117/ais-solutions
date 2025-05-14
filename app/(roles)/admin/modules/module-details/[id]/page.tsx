import React from "react";
import ModuleDetails from "../../_components/module-details";
import { dummyModules } from "@/lib/static";

type ModuleDetailsPageProps = {
  params: Promise<{ id: string }>;
};
const ModuleDetailsPage = async ({ params }: ModuleDetailsPageProps) => {
  const id = (await params).id;
  const data = dummyModules.find((m) => m.id === id);
  return (
    <>
      <ModuleDetails 
        module={data}
      />
    </>
  );
};

export default ModuleDetailsPage;
