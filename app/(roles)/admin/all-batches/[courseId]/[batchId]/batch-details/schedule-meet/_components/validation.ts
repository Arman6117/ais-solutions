// utils/validation.ts

import { FormData, FormErrors } from "./schedule-meet-form";

export interface ValidationResult {
  isValid: boolean;
  errors: FormErrors;
}

export function validateForm(formData: FormData): ValidationResult {
  const errors: FormErrors = {};

  // Meeting name validation
  if (!formData.meetingName.trim()) {
    errors.meetingName = "Meeting name is required";
  }

  // Meeting link validation - more flexible
  if (!formData.meetingLink.trim()) {
    errors.meetingLink = "Meeting link is required";
  } else {
    // Very flexible URL validation - accepts various formats
    const hasProtocol = /^https?:\/\//i.test(formData.meetingLink);
    const hasWww = /^www\./i.test(formData.meetingLink);
    const hasDomain = /\.(com|org|net|io|app|co|dev|edu|gov|in|xyz|online|meet|zoom|teams)/i.test(formData.meetingLink);
    
    // Accept if it has protocol OR www OR looks like a domain
    if (!hasProtocol && !hasWww && !hasDomain) {
      errors.meetingLink = "Please enter a valid meeting link";
    }
  }

  // Batch validation
  if (!formData.selectedBatchId) {
    errors.batch = "Please select a batch";
  }

  // Module validation
  if (!formData.selectedModuleId) {
    errors.module = "Please select a module";
  }

  // Subtopics validation
  if (formData.selectedSubtopics.length === 0) {
    errors.subtopics = "Please select at least one subtopic";
  }

  // Instructor validation
  if (!formData.instructor) {
    errors.instructor = "Please select an instructor";
  }

  // Date validation - handle both single and multiple modes
  if (formData.isMultipleMode) {
    // Multiple dates mode
    if (!formData.dates || formData.dates.length === 0) {
      errors.date = "Please select at least one date";
    } else if (formData.dates.length > 15) {
      errors.date = "You can select up to 15 dates maximum";
    }
  } else {
    // Single date mode
    if (!formData.date) {
      errors.date = "Please select a date";
    }
  }

  // Time validation
  if (!formData.time) {
    errors.time = "Please select a time";
  } else {
    // Validate time format (HH:MM)
    const timePattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timePattern.test(formData.time)) {
      errors.time = "Please enter a valid time in HH:MM format";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// Optional: Helper function to validate individual URL
export function isValidUrl(url: string): boolean {
  try {
    // Try to create a URL object
    new URL(url);
    return true;
  } catch {
    // If it fails, check if it's a partial URL that could be valid
    const patterns = [
      /^https?:\/\/.+/i,                    // Has protocol
      /^www\..+\..+/i,                       // Starts with www
      /^[a-z0-9-]+\.(com|org|net|io|app)/i  // Domain pattern
    ];
    
    return patterns.some(pattern => pattern.test(url));
  }
}

// Optional: Helper to normalize URLs (add https:// if missing)
export function normalizeUrl(url: string): string {
  const trimmed = url.trim();
  
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  
  if (/^www\./i.test(trimmed)) {
    return `https://${trimmed}`;
  }
  
  // If it looks like a domain without protocol or www
  if (/^[a-z0-9-]+\./i.test(trimmed)) {
    return `https://${trimmed}`;
  }
  
  return trimmed;
}
