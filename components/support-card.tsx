"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Mail, Phone, Clock, Trash, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import AddSupportMemberDialog from "./add-support-member-dialog";
import {
  updateSupportMember,
  deleteSupportMember,
} from "@/actions/admin/support/support-card-member";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Define the shape of the data returned by the dialog form
type SupportMemberUpdateData = {
  name: string;
  designation: string;
  email: string;
  contact: string;
  availableTime: string;
  assignedBatches?: (string | number)[]; // Allow string or number IDs to be safe
};

type SupportCardProps = {
  memberId: string;
  departmentId: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  availableTime: string;
  assignedBatches?: { id: string; name: string }[];
  departmentColor?: string;
};

const SupportCard = ({
  memberId,
  departmentId,
  name,
  role,
  email,
  phone,
  availableTime,
  assignedBatches = [],
  departmentColor = "bg-blue-50",
}: SupportCardProps) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = React.useState(false);

  // Generate initials for avatar fallback
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const accentColorClass = departmentColor.replace("bg-", "bg-opacity-100 bg-");

  // --- Handlers ---

  // Replaced 'any' with the specific type
  const handleUpdate = async (updatedData: SupportMemberUpdateData) => {
    try {
      // Clean and ensure all IDs are strings
      const cleanAssignedBatches = (updatedData.assignedBatches || []).map(
        (id) => (typeof id === "string" ? id : id.toString())
      );

      const payload = {
        departmentId,
        memberId,
        name: updatedData.name,
        designation: updatedData.designation,
        email: updatedData.email,
        contact: updatedData.contact,
        availableTime: updatedData.availableTime,
        assignedBatches: cleanAssignedBatches,
      };

      const result = await updateSupportMember(payload);

      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update member");
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteSupportMember(departmentId, memberId);
      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete member");
    } finally {
      setIsDeleting(false);
    }
  };

  // Map batches for initial data
  // The dialog expects assignedBatches as string[] of IDs
  const initialBatchIds = assignedBatches.map((b) => b.id);

  return (
    <Card className="group relative overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 bg-white">
      <div className={`h-2 w-full ${accentColorClass}`} />

      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
          <AvatarImage
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`}
          />
          <AvatarFallback className="bg-slate-100 text-slate-600 font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="font-semibold text-lg text-gray-900 leading-tight group-hover:text-primary transition-colors">
            {name}
          </h3>
          <Badge
            variant="secondary"
            className="w-fit mt-1 text-xs font-normal px-2 py-0 bg-slate-100 text-slate-600 hover:bg-slate-200"
          >
            {role}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-2">
        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-50 transition-colors text-sm text-gray-600">
          <div className="bg-blue-50 p-1.5 rounded-full text-blue-600">
            <Mail className="w-4 h-4" />
          </div>
          <span className="truncate font-medium" title={email}>
            {email}
          </span>
        </div>

        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-50 transition-colors text-sm text-gray-600">
          <div className="bg-green-50 p-1.5 rounded-full text-green-600">
            <Phone className="w-4 h-4" />
          </div>
          <span className="font-medium">{phone}</span>
        </div>

        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-50 transition-colors text-sm text-gray-600">
          <div className="bg-amber-50 p-1.5 rounded-full text-amber-600">
            <Clock className="w-4 h-4" />
          </div>
          <span className="font-medium">Available: {availableTime}</span>
        </div>

        {assignedBatches.length > 0 && (
          <div className="pt-2 flex flex-wrap gap-1">
            {assignedBatches.slice(0, 3).map((b) => (
              <Badge
                key={b.id}
                variant="outline"
                className="text-[10px] px-1 py-0 h-5 bg-slate-50"
              >
                {b.name}
              </Badge>
            ))}
            {assignedBatches.length > 3 && (
              <Badge
                variant="outline"
                className="text-[10px] px-1 py-0 h-5 bg-slate-50"
              >
                +{assignedBatches.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-2 pb-4 px-4 flex justify-between border-t bg-gray-50/50">
        {/* Use type assertion here if the dialog props aren't strictly typed to SupportMemberUpdateData yet */}
        <AddSupportMemberDialog
          initialData={{
            name,
            availableTime,
            contact: phone,
            designation: role,
            email,
            assignedBatches: initialBatchIds,
          }}
          triggerLabel={
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-600 hover:text-blue-600 hover:bg-blue-50 h-8 px-2"
            >
              <Edit className="w-4 h-4 mr-1.5" />
              Edit
            </Button>
          }
          onSubmit={handleUpdate } 
        />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-600 hover:text-red-600 hover:bg-red-50 h-8 px-2"
              disabled={isDeleting}
            >
              <Trash className="w-4 h-4 mr-1.5" />
              {isDeleting ? "..." : "Delete"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently remove {name} from the support team.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default SupportCard;
