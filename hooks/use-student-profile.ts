// hooks/useStudentProfile.ts
import { useState, useCallback, useEffect } from "react";
import { EditableData } from "@/lib/types/student-profile.type";
import { uploadToCloudinary } from "@/lib/helpers/upload-to-cloudinary";
import { StudentData } from "@/lib/types/student";

import { toast } from "sonner"; // or your toast library
import { updateStudent } from "@/actions/student/profile/update-student";

interface UseStudentProfileReturn {
  studentData: StudentData | null;
  editData: EditableData;
  isEditing: boolean;
  uploading: boolean;
  saving: boolean;
  setStudentData: React.Dispatch<React.SetStateAction<StudentData | null>>;
  handleEditToggle: () => void;
  handleSave: () => Promise<void>;
  handleCancel: () => void;
  handleEditDataChange: (field: keyof EditableData, value: string) => void;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export const useStudentProfile = (
  initialData: StudentData | null
): UseStudentProfileReturn => {
  const [studentData, setStudentData] = useState<StudentData | null>(
    initialData || null
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  const [editData, setEditData] = useState<EditableData>({
    name: initialData?.name || "",
    number: initialData?.phone || "",
  });

  // Update editData when initialData changes
  useEffect(() => {
    if (initialData) {
      setStudentData(initialData);
      setEditData({
        name: initialData.name,
        number: initialData.phone,
      });
    }
  }, [initialData]);

  const handleEditToggle = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleSave = useCallback(async () => {
    if (!studentData) return;

    try {
      setSaving(true);

      // Call server action to update student
      const result = await updateStudent({
        studentId: studentData._id,
        name: editData.name,
        phone: editData.number,
        profilePic: studentData.profilePic,
      });

      if (!result.success) {
        toast.error("Failed to update profile");
        return;
      }

      setStudentData((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          name: editData.name,
          phone: editData.number,
        };
      });


      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Failed to save student data:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setSaving(false);
    }
  }, [editData, studentData]);

  const handleCancel = useCallback(() => {
    if (!studentData) return;

    setEditData({
      name: studentData.name,
      number: studentData.phone,
    });
    setIsEditing(false);
  }, [studentData]);

  const handleEditDataChange = useCallback(
    (field: keyof EditableData, value: string) => {
      setEditData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  const handleImageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file || !studentData) return;

      try {
        setUploading(true);
        
        // Upload to Cloudinary
        const { url } = await uploadToCloudinary(file, "students");

        // Update studentData with the Cloudinary URL
        setStudentData((prev) => {
          if (!prev) return null;
          return { ...prev, profilePic: url };
        });

        toast.success("Profile picture updated");
      } catch (error) {
        console.error("Image upload failed:", error);
        toast.error("Failed to upload image");
      } finally {
        setUploading(false);
      }
    },
    [studentData]
  );

  return {
    studentData,
    editData,
    isEditing,
    uploading,
    saving,
    setStudentData,
    handleEditToggle,
    handleSave,
    handleCancel,
    handleEditDataChange,
    handleImageUpload,
  };
};