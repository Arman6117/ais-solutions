// hooks/useStudentProfile.ts
import { useState, useCallback, useEffect } from "react";
import { EditableData, StudentProfile } from "@/lib/types/student-profile.type";
import { uploadToCloudinary } from "@/lib/helpers/upload-to-cloudinary";
import { StudentData } from "@/lib/types/student";

interface UseStudentProfileReturn {
  studentData: StudentData | null;
  editData: EditableData;
  isEditing: boolean;
  uploading: boolean;
  setStudentData: React.Dispatch<React.SetStateAction<StudentData | null>>;
  handleEditToggle: () => void;
  handleSave: () => void;
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

  const handleSave = useCallback(() => {
    if (!studentData) return;

    setStudentData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        name: editData.name,
        number: editData.number,
      };
    });
    setIsEditing(false);
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
      } catch (error) {
        console.error("Image upload failed:", error);
        // You might want to add error handling here, like showing a toast notification
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
    setStudentData,
    handleEditToggle,
    handleSave,
    handleCancel,
    handleEditDataChange,
    handleImageUpload,
  };
};