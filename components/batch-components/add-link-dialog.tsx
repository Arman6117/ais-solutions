import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";

const AddLinkDialog = ({
  setLinkLabel,
  setLink,
  link,
  label,
  createLink,
}: {
  setLinkLabel: (label: string) => void;
  setLink: (link: string) => void;
  link: string;
  label: string;
  createLink?: () => void;
}) => {
  const onSave = () => {
    toast.success("Link added");
    
        console.log("Found function")
      
    
  };
  return (
    //   <DialogContent>
    <>
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-2">
          <Label className="text-lg ">Label</Label>
          <Input
            className="focus-visible:ring-0 "
            placeholder="Enter label.."
            required
            value={label}
            onChange={(e) => setLinkLabel(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-lg ">Link</Label>
          <Input
            className="focus-visible:ring-0 "
            placeholder="Enter link.."
            required
            value={link}
            type="url"
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <div className="flex gap-5">
          <Button onClick={()=> {
            onSave()
            createLink?.();
          }} className="bg-primary-bg cursor-pointer">
            Save
          </Button>
          <DialogClose asChild>
            <Button variant={"ghost"} className="cursor-pointer">
              Cancel
            </Button>
          </DialogClose>
        </div>
      </div>
    </>
    //   </DialogContent>
  );
};

export default AddLinkDialog;
