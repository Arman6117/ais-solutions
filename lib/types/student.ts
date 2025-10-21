type Batch = {
  batchId: {
    _id: '68baf7bb40a3011866ab85e7',
    name: 'Batch-001'
  },
}
export interface StudentTable {
  _id:string,
  name:string,
  email:string,
  phone:string,
  gender:"male" | "female" | "other",
  batches:Batch[],
  feeStatus:"paid" | "partially" | "unpaid", 
  createdAt: string,
}

export interface Course {

courseId: {
    _id: string;
    courseName: string;
  courseStatus?: 'Completed' | 'Ongoing' | 'Upcoming';
  progress?: number;
  duration?: string;
  courseStartDate:string,
  courseEndDate:string,
  courseThumbnail:string
  courseMode:"online" | "offline" | "hybrid"
  studentsEnrolled:string[]
  courseLevel:"beginner"| "intermediate"| "advanced"
}
  totalFees:number,
  dueDate:string,
  amountPaid:number,
  remainingFee:number
  instructor?: string;
  isApproved?:boolean
  batches?:string
  status?:string

}

export interface StudentData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  profilePic:string
  gender:"male" | "female" | "other";
  role: "student";
  feesStatus: "paid" | "partial" | "unpaid";
  createdAt: string;
  batches:Batches[]
  updatedAt: string;
  courses:Course[],
  invoices: Invoices[];
  referralCode: string,
  totalFees?:number
  remainingFee?:number
  amountPaid?:number
}

export interface Batches{
  batchId: {
    _id:string,
    name:string,
    status:"Upcoming"| "Completed"|"Ongoing"
    modules:{name:string}[]
  },
  mode:"offline" | "online" |"hybrid",
  enrolledAt:string,

}
export interface Invoices {
  _id: string;
  totalFees: number;
  remainingFees: number;
  amountPaid: number;
  courseDetails: {
    courseId:string
    totalFees: number,
    remainingFees: number,
    amountPaid: number,
    dueDate: string,
    status: "paid"| "partially paid"|"due"
  }[];
}
/*
 _id: 'AIS2',
    name: 'Arman Patel',
    email: 'armanp384@gmail.com',
    phone: '7058801089',
    gender: 'male',
    profilePic: 
      'https://res.cloudinary.com/dujuicshq/image/upload/v1757338597/students/ernki8jahjub2qrgzlfb.png',
    role: 'student',
    feeStatus: 'paid',
    batches: [
      {
        batchId: {
          _id: '68baf7bb40a3011866ab85e7',
          name: 'Batch-001',
          status: 'Upcoming'
        },
        mode: 'offline',
        enrolledAt: '2025-09-08T13:42:58.855Z',
        _id: '68bedd62581a268a7e8336ed'
      },
      {
        batchId: {
          _id: '68bee19f15de87c3ea4063a9',
          name: 'hh',
          status: 'Upcoming'
        },
        mode: 'offline',
        enrolledAt: '2025-09-08T18:52:47.356Z',
        _id: '68bf25ff190e8f59c5648510'
      },
      {
        batchId: {
          _id: '68d7fbb4ef47f4d8cb38441c',
          name: 'Batch-002',
          status: 'Upcoming'
        },
        mode: 'online',
        enrolledAt: '2025-09-27T15:01:52.038Z',
        _id: '68d7fc60ef47f4d8cb38444e'
      }
    ],
    invoices: [
      {
        _id: '68bedd62581a268a7e8336ea',
        courseDetails: [
          {
            courseId: '68baab886e1e23bb3a81a287',
            modules: [ '68bab4766e1e23bb3a81a28d' ],
            totalFees: 8000,
            remainingFees: 7000,
            amountPaid: 1000,
            dueDate: '2025-09-23',
            status: 'Partially Paid',
            mode: 'offline'
          }
        ]
      },
      {
        _id: '68bf25ff190e8f59c564850e',
        courseDetails: [
          {
            courseId: '68bdd79a04e80b8cc4cfe169',
            modules: [ '68bab4766e1e23bb3a81a28d' ],
            totalFees: 26000,
            remainingFees: 26000,
            amountPaid: 0,
            status: 'Paid',
            mode: 'offline'
          }
        ]
      },
      {
        _id: '68d7fc5fef47f4d8cb38444c',
        courseDetails: [
          {
            courseId: '68d7fb27ef47f4d8cb384405',
            modules: [ '68bee560a38dd880f8c9e59d' ],
            totalFees: 99,
            remainingFees: 99,
            amountPaid: 0,
            status: 'Paid',
            mode: 'online'
          }
        ]
      }
    ],
    courses: [
      {
        courseId: {
          _id: '68baab886e1e23bb3a81a287',
          courseName: 'React course',
          courseThumbnail: 
            'https://res.cloudinary.com/dujuicshq/image/upload/v1757064070/course/iluetndsc2vos5dray4e.png',
          courseStartDate: '2025-09-01T18:30:00.000Z',
          courseEndDate: '2025-09-16T18:30:00.000Z'
        },
        moduleId: [ '68bab4766e1e23bb3a81a28d' ],
        approvedAt: '2025-09-08T13:42:58.855Z',
        isApproved: true,
        _id: '68bedc9b93395a1c0895da8e'
      },
      {
        courseId: {
          _id: '68bdd79a04e80b8cc4cfe169',
          courseName: 'Data analysis ',
          courseThumbnail: 
            'https://res.cloudinary.com/dujuicshq/image/upload/v1757271961/course/t2kx2buoxhvyqu96lwnr.jpg',
          courseStartDate: '2025-09-09T00:00:00.000Z',
          courseEndDate: '2025-12-09T00:00:00.000Z'
        },
        moduleId: [ '68bab4766e1e23bb3a81a28d' ],
        approvedAt: '2025-09-08T18:52:47.355Z',
        isApproved: true,
        _id: '68bf25da53e14851fcec5fd3'
      },
      {
        courseId: {
          _id: '68d7fb27ef47f4d8cb384405',
          courseName: 'Power BI',
          courseThumbnail: 
            'https://res.cloudinary.com/dujuicshq/image/upload/v1758984997/course/xlupzweq9xgzhe8tvl8u.png',
          courseStartDate: '2025-09-03T00:00:00.000Z',
          courseEndDate: '2025-10-04T00:00:00.000Z'
        },
        moduleId: [ '68bee560a38dd880f8c9e59d' ],
        approvedAt: '2025-09-27T15:01:52.038Z',
        isApproved: true,
        _id: '68d7fc2b4aa9b7ba959800ba'
      }
    ],
    createdAt: '2025-09-08T13:36:43.997Z',
    updatedAt: '2025-09-27T15:01:52.038Z',
    __v: 0
  }
*/