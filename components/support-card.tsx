"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, Phone, Clock, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddSupportMemberDialog from "./add-support-member-dialog";

type SupportCardProps = {
  name: string;
  role: string;
  email: string;
  phone: string;
  availableTime: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

const SupportCard = ({
  name,
  role,
  email,
  phone,
  availableTime,
}: SupportCardProps) => {
  return (
    <Card className="w-full max-w-md border border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{name}</CardTitle>
        <p className="text-muted-foreground text-sm">{role}</p>
      </CardHeader>

      <CardContent className="space-y-3 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-primary" />
          <span>{email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-green-600" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-yellow-500" />
          <span>Available: {availableTime}</span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-3 items-center pt-4">
        {/* AccordionContent className="bg-gray-100 p-5 rounded-b-md"> */}
        <div className="flex justify-end ">
          <AddSupportMemberDialog
            initialData={{
              name,
              availableTime,
              contact: phone,
              designation: role,
              email,
            }}
            triggerLabel="Edit"
            onSubmit={(member) => {
              console.log("Member updated  to", member);
              // 👉 Store or backend logic here
            }}
          />
        </div>
        <Button variant="destructive" size="sm">
          <Trash className="w-4 h-4 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SupportCard;
