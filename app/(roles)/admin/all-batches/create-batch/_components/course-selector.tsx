
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react'
type CourseSelectorProps = {
    setCourseId:(value:string)=> void;
    handleInputChange:(field:string,value:string) => void;
    courseList:{id:string,name:string}[]
    setCourseList: React.Dispatch<React.SetStateAction<{ id: string; name: string }[]>>;

}
const CourseSelector = ({courseList,handleInputChange,setCourseId,setCourseList}:CourseSelectorProps) => {
 
  return (
    <div className="space-y-2">
    <Label>Course</Label>
    <Select
      onValueChange={(value) => {
        setCourseId(value);
        handleInputChange("courseId", value);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a course" />
      </SelectTrigger>
      <SelectContent>
        {courseList.map((course) => (
          <SelectItem key={course.id} value={course.id}>
            {course.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
  )
}

export default CourseSelector