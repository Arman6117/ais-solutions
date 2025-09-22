// components/profile/ProfileHeader.tsx
import React, { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit3, Save, X, Phone, Camera, Mail } from "lucide-react";
import { EditableData, StudentProfile } from "@/lib/types/student-profile.type";
import ProfileDetail from "./profile-detail";
import { StudentData } from "@/lib/types/student";

type ProfileHeaderProps = {
  studentData: StudentData | null;
  isEditing: boolean;
  editData: EditableData;
  onEditToggle: () => void;
  onSave: () => void;
  onCancel: () => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEditDataChange: (field: keyof EditableData, value: string) => void;
};
const ProfileHeader = ({
  studentData,
  isEditing,
  editData,
  onEditToggle,
  onSave,
  onCancel,
  onImageUpload,
  onEditDataChange,
}: ProfileHeaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };
  if(!studentData) {
    return <h1>No</h1>
  }

  return (
    <Card className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 border-0 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>

      <CardContent className="relative p-6 md:p-8 lg:p-12">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
          <div className="relative group">
            <Avatar className="size-28 md:size-36 border-4 border-white/30 shadow-2xl">
              <AvatarImage
                src={studentData.profilePic}
                alt="Profile"
                className="group-hover:scale-110  object-cover transition-transform duration-500"
              />
              <AvatarFallback className="bg-white text-purple-600 text-2xl font-bold">
                {studentData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <Button
              onClick={handleImageClick}
              size="icon"
              className="absolute -bottom-2 -right-2 bg-white text-purple-600 rounded-full p-2 cursor-pointer hover:bg-primary-bg hover:border hover:border-white hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-0"
            >
              <Camera className="size-4 md:size-5" />
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onImageUpload}
              className="hidden"
            />
          </div>

          <div className="flex-1 text-center lg:text-left text-white space-y-6">
            <div className="flex flex-col md:flex-row md:justify-center lg:justify-start items-center gap-4">
              {isEditing ? (
                <Input
                  type="text"
                  value={editData.name}
                  onChange={(e) => onEditDataChange("name", e.target.value)}
                  className="text-2xl md:text-4xl font-bold bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder-white/70 focus:ring-white/50 focus:bg-white/25 transition-all duration-300 h-auto py-2 md:py-3"
                />
              ) : (
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                  {studentData.name}
                </h1>
              )}

              <div className="flex gap-3">
                {isEditing ? (
                  <>
                    <Button
                      onClick={onSave}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Save className="w-4 h-4 mr-2" /> Save
                    </Button>
                    <Button
                      onClick={onCancel}
                      variant="outline"
                      className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300"
                    >
                      <X className="w-4 h-4 mr-2" /> Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={onEditToggle}
                    className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Edit3 className="w-4 h-4 mr-2" /> Edit Profile
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileDetail
                icon={<Mail />}
                label="Email Address"
                value={studentData.email}
              />
              <ProfileDetail
                icon={<Phone />}
                label="Phone Number"
                value={editData.number}
                editable={isEditing}
                onChange={(e) => onEditDataChange("number", e.target.value)}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;