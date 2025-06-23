import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ApproveRequestDialog } from "./approve-request-dialog";


const mockPendingRequests = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    course: "Web Development",
    modules: ["HTML", "CSS", "JavaScript"],
    price: 12000,
    availableBatches: ["Batch A", "Batch B", "Batch C"],
  },
  {
    id: "2",
    name: "Sara Ali",
    email: "sara@example.com",
    course: "Data Science",
    modules: ["Python", "Pandas", "ML"],
    price: 15000,
    availableBatches: ["DS Batch 1", "DS Batch 2"],
  },
];

const PendingRequestPanel = () => {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-3 bg-gray-50 border-b flex justify-between">
        <CardTitle className="text-xl text-violet-900 font-semibold">
          Pending Requests
        </CardTitle>
      </CardHeader>

      <div className="p-4 space-y-4">
        {mockPendingRequests.map((request) => (
          <div
            key={request.id}
            className="bg-white border rounded-lg p-4 shadow-sm flex justify-between items-center hover:bg-violet-50 transition-colors"
          >
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {request.name}
              </p>
              <p className="text-xs text-gray-500">{request.email}</p>
              <p className="text-sm text-gray-700 mt-1">{request.course}</p>
            </div>
            <ApproveRequestDialog request={request} />
          </div>
        ))}
        {mockPendingRequests.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No pending requests found.
          </p>
        )}
      </div>
    </Card>
  );
};

export default PendingRequestPanel;
