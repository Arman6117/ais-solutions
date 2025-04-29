import React from 'react'

const PageContainer = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="ml-12 md:ml-24 flex rounded-4xl px-6 py-4 bg-white h-full overflow-y-scroll">{children}</div>
  )
}

export default PageContainer