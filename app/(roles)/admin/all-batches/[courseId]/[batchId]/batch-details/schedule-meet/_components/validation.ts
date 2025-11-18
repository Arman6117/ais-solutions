import { FormData, FormErrors } from "./schedule-meet-form";

export const validateForm = (formData: FormData) => {
  const errors: FormErrors = {};

  if (!formData.meetingName.trim()) {
    errors.meetingName = "Meeting name is required";
  }

  if (!formData.meetingLink.trim()) {
    errors.meetingLink = "Meeting link is required";
  }

  if (!formData.selectedBatchId) {
    errors.batch = "Please select a batch";
  }

  if (!formData.selectedModuleId) {
    errors.module = "Please select a module";
  }

 


  if (!formData.isMultipleMode && !formData.date) {
    errors.date = "Please select a date";
  }

  if (formData.isMultipleMode && formData.dates.length === 0) {
    errors.date = "Please select at least one date";
  }

  if (!formData.time) {
    errors.time = "Please select a time";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
