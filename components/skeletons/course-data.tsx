import { BookOpen } from 'lucide-react'
import React from 'react'
import { Skeleton } from '../ui/skeleton'

const CourseDataSkeleton = () => {
  return (
    <div className="flex flex-col p-4 w-full  bg-soft-white">
    <div className="bg-white p-1 size-7 h-auto flex items-center  rounded-md ">
        <Skeleton className="bg-primary-bg/20 rounded size-7"/>
    </div>
    <div className="flex flex-col gap-2">
        <Skeleton className="w-32 h-24 bg-primary-bg/20"/>
        <Skeleton className="w-40 h-4 bg-primary-bg/20"/>
    </div>
  </div>
  )
}

export default CourseDataSkeleton