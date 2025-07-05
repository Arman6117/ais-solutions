'use server'

export const registerStudent =async (formData:StudentS) => {
  const data = {
    name:formData.get('name'),
    email:formData.get('email'),
    phone:formData.get('phone'),
    gender:formData.get('gender'),
    password:formData.get('password'),
    referralCode:formData.get('referralCode'),
    profilePic:formData.get('profilePic') as File,
    
  }

  console.log(data)
} 