import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import React from "react";

type SessionMarkAsWatchedButtonProps = {
  onClick: () => void;
};

const SessionMarkAsWatchedButton = ({
  onClick,
}: SessionMarkAsWatchedButtonProps) => {
  return (
    <Button
      className="hover:bg-primary-bg/10 items-center flex gap-2 cursor-pointer border-primary-bg"
      variant={"outline"}
    >
     <CheckCircle className="text-primary-bg"/>
     <span className="text-primary-bg">Mark As Watched</span>
    </Button>
  );
};

export default SessionMarkAsWatchedButton;
