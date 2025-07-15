import React from "react";
import ModuleDetails from "../../_components/module-details";

import { getModuleById } from "@/actions/admin/modules/get-modules";

type ModuleDetailsPageProps = {
  params: Promise<{ id: string }>;
};
const ModuleDetailsPage = async ({ params }: ModuleDetailsPageProps) => {
  const id = (await params).id;
  const data = await getModuleById(id)

  if (!data.success) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{data.message}</p>
      </div>
    );
  }
  return (
    <>
      <ModuleDetails 
        module={data.data}
      />
    </>
  );
};

export default ModuleDetailsPage;
