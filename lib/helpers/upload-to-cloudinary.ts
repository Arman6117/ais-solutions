// lib/upload/upload-to-cloudinary.ts
export const uploadToCloudinary = async (file: File, folder = "students") => {
    const timestamp = Math.floor(Date.now() / 1000)
  
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET!)
    formData.append("folder", folder)
    formData.append("api_key", process.env.CLOUDINARY_API_KEY!)
    formData.append("timestamp", String(timestamp))
  
    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    })
  
    if (!res.ok) throw new Error("Failed to upload image")
  
    const data = await res.json()
    return {
      url: data.secure_url,
      public_id: data.public_id,
    }
  }
  