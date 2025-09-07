
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import React from 'react'
type CourseSelectorProps = {
    setCourseId:(value:string)=> void;
    handleInputChange:(field:string,value:string) => void;
    courseList:{_id:string,courseName:string}[]
    setCourseList: React.Dispatch<React.SetStateAction<{ _id: string; courseName: string }[]>>;

}
const CourseSelector = ({courseList,handleInputChange,setCourseId}:CourseSelectorProps) => {
 
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
        {courseList.map((course, index) => (
          <SelectItem key={index} value={course._id}>
            {course.courseName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
  )
}

export default CourseSelector