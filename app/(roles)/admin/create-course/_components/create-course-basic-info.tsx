import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import React from 'react'

const CreateCourseBasicInfo = () => {
  return (
    <Card className='px-2 mt-10 w-full py-3'>
        <CardContent className='p-0 w-full' >
            <CardHeader className='p-0'>
                <CardTitle className='text-2xl'>
                    Basic info for course
                </CardTitle>
            </CardHeader>
             <div className='flex flex-col'>
                <form className='flex flex-col gap-3'>
                    <Label>Course name</Label>
                </form>
             </div>
        </CardContent>
    </Card>
  )
}

export default CreateCourseBasicInfo