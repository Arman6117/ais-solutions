import React from 'react'

const PageContainer = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="ml- md:ml-24 flex relative rounded-4xl sm:px-6 sm:py-4 overflow-x-hidden bg-white h-full overflow-y-scroll">{children}</div>
  )
}

export default PageContainer