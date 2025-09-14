import React from 'react'

const PageContainer = ({children}:{children:React.ReactNode}) => {
  return (
    <div className=" md:ml-20 flex relative rounded-[26px] sm:px-6 py-2 px-4 sm:py-4 overflow-x-hidden bg-white h-full overflow-y-scroll">{children}</div>
  )
}

export default PageContainer