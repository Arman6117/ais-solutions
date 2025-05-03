import React, { useState } from "react";
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "../ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Mail, Minus, Plus } from "lucide-react";
import { Badge } from "../ui/badge";
import { toast } from "sonner";

type EditInstructorDialogProps = {
  open: boolean;
  onClose: () => void;
  instructor: any;
};

const dummyModules = [
  "Introduction to React",
  "Advanced React Patterns",
  "State Management",
  "React Performance",
];
const remainingModules = [
  "SSR in React",
  "React Testing",
  "React Router",
  "React Query",
];
const EditInstructorDialog = ({
  open,
  instructor,
  onClose,
}: EditInstructorDialogProps) => {
  const [assignedModules, setAssignedModules] = useState(dummyModules);
  const [availableModules, setAvailableModules] = useState(remainingModules);
  const [showAvailableModules, setShowAvailableModules] = useState(false);
  if (!instructor) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="w-  items-center justify-center">
          <DialogHeader>
            <DialogTitle>Edit Instructor Details</DialogTitle>
          </DialogHeader>
          <Button className="bg-primary-bg ">
            <DialogClose className="w-full h-full cursor-pointer">
              No Instructor Selected
            </DialogClose>
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  const handleAssignModule = (module: string) => {
    //TODO:Make an API Call
    const existing = assignedModules.includes(module);
    if (existing) {
      toast.error("Module already present");
      return;
    }

    setAssignedModules((prev) => [...prev, module]);
    setAvailableModules((prev) => prev.filter((mod) => mod !== module));
    toast.success("Module added");
  };

  const handleRemoveModule = (module: string) => {
    //TODO:Make an API Call
    const existing = availableModules.includes(module);
    if (existing) {
      toast.error("Module does not exists");
      return;
    }

    setAssignedModules((prev) => prev.filter((mod) => mod !== module));
    setAvailableModules((prev) => [...prev, module]);

    toast.success("Module removed");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-64">
        <DialogHeader>
          <DialogTitle>Edit Instructor Details</DialogTitle>
        </DialogHeader>
        {/* <Separator className="bg-prim/\ary-bg "/> */}
        <div className="flex flex-col">
          <div className="bg-gradient-to-r rounded from-violet-600 to-indigo-600 text-white p-5">
            <div className="flex items-center gap-4">
              <Avatar className="size-20 border-4 border-white/30">
                <AvatarImage
                  className="object-cover"
                  src={instructor.avatar}
                  alt={instructor.name}
                />
                <AvatarFallback className="bg-white/20 text-white font-medium text-xl">
                  {instructor.name.charAt(0) +
                    instructor.name.split(" ")[1]?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-bold">{instructor.name}</h1>
                <div className="flex items-center gap-1 text-white/80 text-sm">
                  <Mail size={14} />
                  <span>{instructor.email}</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <Badge className="bg-white/20 hover:bg-white/30 text-white border-none">
                    {instructor.role || "Instructor"}
                  </Badge>
                  {instructor.isLead && (
                    <Badge className="bg-amber-500/80 hover:bg-amber-500/90 text-white border-none">
                      Lead
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-5">
            <h1 className="text font-bold">Modules</h1>
            <div className="flex flex-wrap gap-2">
              {assignedModules.map((module, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="bg-violet-50 cursor-pointer transition-all text-violet-700 group border-violet-200 py-1 px-2 justify-center"
                  onClick={() => handleRemoveModule(module)}
                >
                  <Minus size={6} className="hidden group-hover:block  " />
                  {module}
                </Badge>
              ))}
              <Button
                variant={"outline"}
                size={"sm"}
                className="bg-violet-50 h-6 text-xs p-0 cursor-pointer text-violet-700 border-violet-200 0 justify-center"
                onClick={()=>setShowAvailableModules((prev)=> !prev)}
              >
                <Plus size={6} />
                Assign Module
              </Button>
            </div>
            {showAvailableModules && (
              <div className="transition-all 5">
                <h1 className="text font-bold">Available Modules</h1>
                <div className="flex flex-wrap gap-2 mt-3">
                  {availableModules.map((module, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="bg-violet-50 cursor-pointer hover:text-violet-700 text-neutral-400 border-violet-200 py-1 px-2 justify-center"
                      onClick={() => handleAssignModule(module)}
                    >
                      <Plus size={7} />
                      {module}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditInstructorDialog;
