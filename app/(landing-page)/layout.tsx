// import Navbar from '@/components/navbar'
import React from 'react'

const HomePageLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <main className='py-4 px-7'>
    {/* <Navbar/> */}
    {children}
    </main>
  )
}

export default HomePageLayout