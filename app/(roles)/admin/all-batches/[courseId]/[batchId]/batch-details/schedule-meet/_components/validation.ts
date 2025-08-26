// utils/validation.ts

import { FormData, FormErrors } from "./schedule-meet-form";


export interface ValidationResult {
  isValid: boolean;
  errors: FormErrors;
}

export function validateForm(formData: FormData): ValidationResult {
  const errors: FormErrors = {};

  if (!formData.meetingName.trim()) {
    errors.meetingName = "Meeting name is required";
  }

  if (!formData.meetingLink.trim()) {
    errors.meetingLink = "Meeting link is required";
  } else {
    // Validate meeting link format (basic URL validation)
    const urlPattern =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlPattern.test(formData.meetingLink)) {
      errors.meetingLink = "Please enter a valid URL";
    }
  }

  if (!formData.selectedBatchId) {
    errors.batch = "Please select a batch";
  }

  if (!formData.selectedModuleId) {
    errors.module = "Please select a module";
  }

  if (formData.selectedSubtopics.length === 0) {
    errors.subtopics = "Please select at least one subtopic";
  }

  if (!formData.instructor) {
    errors.instructor = "Please select an instructor";
  }

  if (!formData.date) {
    errors.date = "Please select a date";
  }

  if (!formData.time) {
    errors.time = "Please select a time";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}