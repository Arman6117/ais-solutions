// lib/upload/upload-to-cloudinary.ts
export const uploadToCloudinary = async (file: File, folder = "students") => {
  // Validate file
  if (!file) {
    throw new Error("No file provided");
  }

  console.log("File to upload:", {
    name: file.name,
    type: file.type,
    size: file.size
  });

  const formData = new FormData();
  formData.append("file", file);
  
  // Use the appropriate upload preset based on folder
  const uploadPreset = folder !== "students"
    ? process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET_COURSE!
    : process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET_STUDENT!;
  
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", folder);

  // Debug: Log FormData entries (FormData doesn't show in console.log directly)
  console.log("FormData contents:");
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`${key}:`, { name: value.name, type: value.type, size: value.size });
    } else {
      console.log(`${key}:`, value);
    }
  }
  
  // Validate environment variables
  if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
    throw new Error("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not defined");
  }
  if (!uploadPreset) {
    throw new Error("Upload preset is not defined");
  }

  const uploadUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
  console.log("Upload URL:", uploadUrl);
  
  const res = await fetch(uploadUrl, {
    method: "POST",
    body: formData,
  });

  console.log("Response status:", res.status);
  console.log("Response ok:", res.ok);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error("Upload failed:", errorData);
    throw new Error(`Failed to upload image: ${errorData.error?.message || res.statusText}`);
  }

  const data = await res.json();
  console.log("Upload successful:", data.secure_url);
  
  return {
    url: data.secure_url,
    public_id: data.public_id,
  };
};