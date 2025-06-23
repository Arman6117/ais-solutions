import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const PendingRequestPanel = () => {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader className={"pb-3 bg-gray-50 border-b flex justify-between"}>
        <CardTitle className="text-xl">Pending Requests</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default PendingRequestPanel;
