// components/profile/ProfileDetail.tsx
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

interface ProfileDetailProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  editable?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileDetail = ({
  icon,
  label,
  value,
  editable = false,
  onChange,
}: ProfileDetailProps) => (
  <div className="flex items-center gap-4 text-white/95">
    <Avatar className="bg-white/20 backdrop-blur-sm p-3 w-12 h-12">
      <AvatarFallback className="bg-transparent">{icon}</AvatarFallback>
    </Avatar>
    <div>
      <div className="text-sm opacity-80 font-medium">{label}</div>
      {editable && onChange ? (
        <Input
          type="text"
          value={value}
          onChange={onChange}
          className="bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder-white/70 focus:ring-white/50 font-semibold text-lg h-auto py-2"
        />
      ) : (
        <div className="font-semibold text-lg">{value}</div>
      )}
    </div>
  </div>
);

export default ProfileDetail;