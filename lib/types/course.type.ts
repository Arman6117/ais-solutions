export interface CourseSelector {
    courses: {
        _id:string
        courseName:string,
        isApproved?:boolean
    }[]
    
}
export interface StudentCourse  {
    _id:string,
    courseName:string
}