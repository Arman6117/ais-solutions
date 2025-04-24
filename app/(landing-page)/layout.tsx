import Navbar from '@/components/navbar'
import React from 'react'

const HomePageLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <>
    <Navbar/>
    {children}
    </>
  )
}

export default HomePageLayout