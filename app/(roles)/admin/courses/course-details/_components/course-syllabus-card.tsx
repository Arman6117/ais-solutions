import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import React from 'react'


type CourseSyllabusCardProps ={
    mode:'view' |'edit'
}
const CourseSyllabusCard = ({mode}:CourseSyllabusCardProps) => {
  return (
    <Card className="border-0 shadow-md">
    <CardHeader className="flex flex-row items-center justify-between pb-3 bg-gray-50 border-b">
      <CardTitle className="text-xl">Course Syllabus</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex justify-between">
        {mode === "view" ? (
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">File name.pdf </p>
          </div>
        ) : (
          <Input type="file"   />
        )}
      </div>
    </CardContent>
  </Card>
  )
}

export default CourseSyllabusCard