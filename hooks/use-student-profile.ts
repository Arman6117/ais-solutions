// hooks/useStudentProfile.ts
import { EditableData, StudentProfile } from '@/lib/types/student-profile.type';
import { useState, useCallback } from 'react';


interface UseStudentProfileReturn {
  studentData: StudentProfile;
  editData: EditableData;
  isEditing: boolean;
  setStudentData: React.Dispatch<React.SetStateAction<StudentProfile>>;
  handleEditToggle: () => void;
  handleSave: () => void;
  handleCancel: () => void;
  handleEditDataChange: (field: keyof EditableData, value: string) => void;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useStudentProfile = (initialData: StudentProfile): UseStudentProfileReturn => {
  const [studentData, setStudentData] = useState<StudentProfile>(initialData);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editData, setEditData] = useState<EditableData>({
    name: initialData.name,
    number: initialData.number,
  });

  const handleEditToggle = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleSave = useCallback(() => {
    setStudentData((prev) => ({
      ...prev,
      name: editData.name,
      number: editData.number,
    }));
    setIsEditing(false);
  }, [editData]);

  const handleCancel = useCallback(() => {
    setEditData({ 
      name: studentData.name, 
      number: studentData.number 
    });
    setIsEditing(false);
  }, [studentData.name, studentData.number]);

  const handleEditDataChange = useCallback((field: keyof EditableData, value: string) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setStudentData((prev) => ({ ...prev, image: imageUrl }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  return {
    studentData,
    editData,
    isEditing,
    setStudentData,
    handleEditToggle,
    handleSave,
    handleCancel,
    handleEditDataChange,
    handleImageUpload,
  };
};