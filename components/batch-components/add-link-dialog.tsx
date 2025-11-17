import React from "react";
import { DialogClose } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";

type AddLinkDialogProps = {
  label: string;
  link: string;
  setLinkLabel: (label: string) => void;
  setLink: (link: string) => void;
  onAddLink?: (link: string, label: string) => void;

  createLink?: () => void;
};
const AddLinkDialog = ({
 
  link = "",
  
  setLink,
  onAddLink,
  createLink,
}:AddLinkDialogProps) => {
  const handleSave = () => {
    if ( !link.trim()) {
      toast.error("Please enter   link");
      return;
    }


    if (onAddLink) {
      onAddLink(link, link);
    }

    
    if (createLink) {
      createLink();
    }


    toast.success("Link added");


    if (  setLink) {
      setLink("");
    }
  };

  return (
    <div className="flex flex-col gap-7 py-4">
     
      <div className="flex flex-col gap-2">
        <Label className="text-lg">Link</Label>
        <Input
          className="focus-visible:ring-0"
          placeholder="Enter link..."
          required
          value={link}
          type="url"
          onChange={(e) => setLink && setLink(e.target.value)}
        />
      </div>
      <div className="flex gap-5">
        <DialogClose asChild>
          <Button onClick={handleSave} className="bg-primary-bg cursor-pointer">
            Save
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button variant="ghost" className="cursor-pointer">
            Cancel
          </Button>
        </DialogClose>
      </div>
    </div>
  );
};

export default AddLinkDialog;
