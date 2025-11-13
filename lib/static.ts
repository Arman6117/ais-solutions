import { IoBookOutline } from "react-icons/io5";
import { LuFileStack, LuLayoutDashboard, LuSchool } from "react-icons/lu";
import { MdOutlineLocalOffer, MdSupportAgent } from "react-icons/md";
import {
  PiChalkboardTeacher,
  PiChalkboardTeacherDuotone,
  
  PiInvoice,
  PiStudent,
} from "react-icons/pi";
import { Course, DummyBatches, DummyInstructors, DummyModules, DummyStudent, InvoiceTable, Offer, Student } from "./types/types";
import { FaUser } from "react-icons/fa";

export const batchModules = [
  "HTML & CSS Basics",
  "JavaScript Fundamentals",
  "React Core Concepts",
  "Node.js & Express",
  "MongoDB Integration",
  "Authentication & Deployment",
];

export const adminSidebarLinks = [
  {
    label: "Dashboard",
    link: "/admin/dashboard",
    icon: LuLayoutDashboard,
  },
  {
    label: "Courses",
    link: "/admin/courses",
    icon: IoBookOutline,
  },
  {
    label: "All Batches",
    link: "/admin/all-batches",
    icon: LuSchool,
  },
  {
    label: "Modules",
    link: "/admin/modules",
    icon: LuFileStack,
  },
  {
    label: "Instructors",
    link: "/admin/instructors",
    icon: PiChalkboardTeacherDuotone,
  },
  {
    label: "Students",
    link: "/admin/students",
    icon: PiStudent,
  },
  {
    label: "Payments",
    link: "/admin/invoices",
    icon: PiInvoice,
  },
  {
    label: "Offers",
    link: "/admin/offers",
    icon: MdOutlineLocalOffer,
  },
  {
    label: "Support",
    link: "/admin/support",
    icon: MdSupportAgent,
  },
];
export const studentSidebarLinks = [
  {
    label: "Dashboard",
    link: "/student/dashboard",
    icon: LuLayoutDashboard,
  },
  {
    label: "Courses",
    link: "/student/courses",
    icon: IoBookOutline,
  },
  {
    label: "Sessions",
    link: "/student/sessions",
    icon: PiChalkboardTeacher,
  },
  {
    label: "Profile",
    link: "/student/profile",
    icon: FaUser,
  },
];

export const sampleMeetings = [
  {
    _id: "1",
    date: "2025-06-22",
    course: "JavaScript Bootcamp",
    module: "Promise",
    batch: "Batch A",
    time: "10:00 AM",
  },
  {
    _id: "2",
    date: "2025-06-25",
    course: "Python Basics",
    module: "Datatypes",
    batch: "Batch B",
    time: "2:00 PM",
  },
  {
    _id: "3",
    date: "2025-06-25",
    course: "React Hooks",
    module: "useState",
    batch: "Batch C",
    time: "11:00 AM",
  },
  {
    _id: "4",
    date: "2025-06-26",
    course: "Data Structures",
    module: "Array",
    batch: "Batch A",
    time: "9:00 AM",
  },
  {
    _id: "5",
    date: "2025-06-10",
    course: "MongoDB Essentials",
    module: "Indexing",
    batch: "Batch D",
    time: "3:00 PM",
  },
  {
    _id: "6",
    date: "2025-06-11",
    course: "Node.js Advanced",
    module: "Async Await",
    batch: "Batch A",
    time: "12:00 PM",
  },
  {
    _id: "7",
    date: "2025-06-25",
    course: "Next.js 15",
    module: "Dynamic Routing",
    batch: "Batch B",
    time: "10:00 AM",
  },
];

export const ongoingCourses = [
  {
    id:1,
    courseName: "JavaScript Bootcamp",
    batchName: "Batch A",
    lectureNumber: 12,
    module: "Promise",
    instructor: "Mr. Arman Patel",
  },
  {
    id:2,
    courseName: "React.js Mastery",
    batchName: "Batch B",
    lectureNumber: 8,
    module: "useState",
    instructor: "Ms. Robin Teach",
  },
  {id:3,
    courseName: "Python for Data Science",
    batchName: "Batch C",
    lectureNumber: 5,
    module: "Datatypes",
    instructor: "Mr. Zoro Bytes",
  },
  {id:4,
    courseName: "MongoDB Essentials",
    batchName: "Batch D",
    lectureNumber: 15,
    module: "Indexing",
    instructor: "Dr. Nami Data",
  },
  {id:5,
    courseName: "Node.js API Development",
    batchName: "Batch E",
    lectureNumber: 9,
    module: "Dynamic Routing",
    instructor: "Sanji Dev",
  },
];

export const coursesData: Course[] = [
  {
    id: "1",
    name: "JavaScript Bootcamp",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    createdAt: "2024-04-10",
    students: 120,
    discount: 10,
    batches: 5,
    batchesCompleted: 2,
    price: 1000,

    modules: ["Introduction", "Variables", "Functions", "Objects", "Arrays"],
    batchesName: ["Batch A", "Batch B", "Batch C"],
    instructors: ["Arman Patel", "Robin Teach"],
  },
  {
    id: "2",
    name: "React Essentials",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",

    createdAt: "2024-03-15",
    students: 80,
    batches: 3,
    discount: 20,
    batchesCompleted: 2,
    price: 1000,
    modules: ["Introduction", "Variables", "Functions", "Objects", "Arrays"],
    batchesName: ["Batch D", "Batch E", "Batch F"],
    instructors: ["Arman Patel", "Robin Teach"],
  },
  {
    id: "3",
    name: "Data Structures",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",

    createdAt: "2024-02-05",
    students: 60,
    batches: 4,
    discount: 40,
    batchesCompleted: 2,
    price: 1000,
    modules: ["Introduction", "Variables", "Functions", "Objects", "Arrays"],
    batchesName: ["Batch A", "Batch B", "Batch C"],
    instructors: ["Arman Patel", "Robin Teach"],
  },
  {
    id: "4",
    name: "Python Mastery",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",

    createdAt: "2024-01-22",
    students: 100,
    batches: 6,
    batchesCompleted: 1,
    price: 1000,
    discount: 50,
    modules: ["Introduction", "Variables", "Functions", "Objects", "Arrays"],
    batchesName: ["Batch A", "Batch B", "Batch C"],
    instructors: ["Arman Patel", "Robin Teach"],
  },
  {
    id: "5",
    name: "MongoDB Crash Course",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",

    createdAt: "2024-01-10",
    students: 70,
    batches: 2,
    discount: 80,
    batchesCompleted: 2,
    price: 1000,
    modules: ["Introduction", "Variables", "Functions", "Objects", "Arrays"],
    batchesName: ["Batch A", "Batch B", "Batch C"],
    instructors: ["Arman Patel", "Robin Teach"],
  },
  {
    id: "6",
    name: "Fullstack Development",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",

    createdAt: "2024-01-02",
    students: 90,
    discount: 23,
    batches: 5,
    batchesCompleted: 4,
    price: 1000,
    modules: ["Introduction", "Variables", "Functions", "Objects", "Arrays"],
    batchesName: ["Batch A", "Batch B", "Batch C"],
    instructors: ["Arman Patel", "Robin Teach"],
  },
];
export const dummyInstructors: DummyInstructors[] = [
  {
    id: 1,
    name: "John Doe",
    role: "Lead Instructor",
    avatar:
      "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=2266&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    email: "john@example.com",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Assistant Instructor",
    avatar:
      "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=2266&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    email: "jane@example.com",
  },
  {
    id: 3,
    name: "Robert Johnson",
    role: "Teaching Assistant",
    avatar:
      "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=2266&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    email: "robert@example.com",
  },
];
export const dummyBatches: DummyBatches[] = [
  {
    id: "1",
    name: "Morning Batch",
    schedule: "Mon-Wed-Fri",
    time: "9:00 AM - 11:00 AM",
    students: 25,
    startDate: "May 15, 2025",
    endDate: "Aug 15, 2025",
    status: "Ongoing",
  },
  {
    id: "2",
    name: "Evening Batch",
    schedule: "Tue-Thu",
    time: "6:00 PM - 8:30 PM",
    students: 18,
    startDate: "June 1, 2025",
    endDate: "Sep 1, 2025",
    status: "Ongoing",
  },
  {
    id: "3",
    name: "Weekend Batch",
    schedule: "Sat-Sun",
    time: "10:00 AM - 2:00 PM",
    students: 22,
    startDate: "May 20, 2025",
    endDate: "Aug 20, 2025",
    status: "Upcoming",
  },
  {
    id: "4",
    name: "Weekend Batch",
    schedule: "Sat-Sun",
    time: "10:00 AM - 2:00 PM",
    students: 22,
    startDate: "May 20, 2025",
    endDate: "Aug 20, 2025",
    status: "Completed",
  },
];

export const dummyStudents: DummyStudent[] = [
  {
    id: "stu-1",
    name: "Aarav Mehta",
    email: "aarav@example.com",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    phone: "9876543210",
    batchId: "batch-101",
    isApproved: true,
    joinedAt: "2025-05-01",
    modules: ["HTML", "CSS", "JS"],
    courses: [coursesData[0]],
    feesStatus: "paid",
    totalFeePaid: 20000,
    feesRemaining: 0,
    refCoins: 50,
    gender: "Male",
    batches:['Batch A', 'Batch B', 'Batch C'],
  },
  {
    id: "stu-2",
    name: "Isha Rao",
    email: "isha@example.com",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    phone: "9123456780",
    batchId: "1",
    isApproved: true,
    joinedAt: "2025-05-02",
    modules: ["React", "Node"],
    courses: [coursesData[0]],
    feesStatus: "unpaid",
    totalFeePaid: 10000,
    feesRemaining: 10000,
    refCoins: 10,
    gender: "Female",
    batches:['Batch E', 'Batch F', 'Batch G'],
  },
  {
    id: "stu-3",
    name: "Kabir Joshi",
    email: "kabir@example.com",
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    phone: "9988776655",
    batchId: "3",
    isApproved: false,
    joinedAt: "2025-05-03",
    modules: ["Arrays", "Trees"],
    courses: [coursesData[1]],
    feesStatus: "unpaid",
    totalFeePaid: 5000,
    feesRemaining: 10000,
    refCoins: 90,
    gender: "Male",
    batches:['Batch D', 'Batch E', 'Batch F'],
  },
  {
    id: "stu-4",
    name: "Meera Kulkarni",
    email: "meera@example.com",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    phone: "9090909090",
    batchId: "1",
    isApproved: true,
    joinedAt: "2025-05-04",
    modules: ["HTML", "CSS", "JS", "React"],
    courses: [coursesData[0]],
    feesStatus: "paid",
    totalFeePaid: 20000,
    feesRemaining: 0,
    refCoins: 20,
    gender: "Female",
    batches:['Batch A', 'Batch B', 'Batch C'],
  },
  {
    id: "stu-5",
    name: "Rohan Bhat",
    email: "rohan@example.com",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    phone: "8888888888",
    batchId: "1",
    isApproved: true,
    joinedAt: "2025-05-05",
    modules: ["Graphs", "Trees"],
    courses: [coursesData[1]],
    feesStatus: "unpaid",
    totalFeePaid: 7500,
    feesRemaining: 7500,
    refCoins: 400,
    gender: "Male",
    batches:['Batch D', 'Batch E', 'Batch F'],
  },
];

export const coursesWithBatches = [
  {
    id: 1,
    name: "Web Development",
    batches: [
      {
        id: 101,
        name: "Cohort A",
        startDate: "2025-06-01",
        endDate: "2025-08-30",
        studentsCount: 24,
        instructor: "Sarah Johnson",
        status: "Ongoing", // Current date is between start and end
      },
      {
        id: 102,
        name: "Cohort B",
        startDate: "2025-07-15",
        endDate: "2025-10-15",
        studentsCount: 18,
        instructor: "Michael Chen",
        status: "Upcoming", // Current date is before start
      },
    ],
  },
  {
    id: 2,
    name: "Data Science",
    batches: [
      {
        id: 201,
        name: "Evening Batch",
        startDate: "2025-05-10",
        endDate: "2025-08-10",
        studentsCount: 15,
        instructor: "Alex Rivera",
        status: "Ongoing",
      },
      {
        id: 202,
        name: "Weekend Batch",
        startDate: "2025-06-05",
        endDate: "2025-09-05",
        studentsCount: 22,
        instructor: "Priya Patel",
        status: "Upcoming",
      },
      {
        id: 203,
        name: "Morning Batch",
        startDate: "2024-05-20",
        endDate: "2024-08-20",
        studentsCount: 20,
        instructor: "David Kim",
        status: "Completed", // Current date is after end
      },
    ],
  },
  {
    id: 3,
    name: "UX/UI Design",
    batches: [
      {
        id: 301,
        name: "Summer Batch",
        startDate: "2024-06-15",
        endDate: "2024-09-15",
        studentsCount: 16,
        instructor: "Emma Watson",
        status: "Completed",
      },
    ],
  },
];

export const dummyModules:DummyModules[] = [
  {
    id: "1",
    name: "Module 1",
    createdAt: "2024-06-15",
    course: ["Course 1", "Course 2", "Course 3", "Course 4"],
    price: 1000,
    discount: 10,
    offerPrice: 900,
    rating: 4.5,
    status: "Ongoing", // Example status
    description:"The example description"
  },
  {
    id: "2",
    name: "Module 2",
    createdAt: "2024-06-15",
    course: ["Course 1"],
    price: 1000,
    discount: 10,
    offerPrice: 900,
    rating: 4,
    status: "Completed", 
     description:"The example description"
  },
  {
    id: "3",
    name: "Module 3",
    createdAt: "2024-06-15",
    course: ["Course 1", "Course 2", "Course 3", "Course 4", "Course 5"],
    price: 6000,
    discount: 10,
    offerPrice: 5900,
    rating: 5,
    status: "Upcoming", 
     description:"The example description"
  },
  {
    id: "4",
    name: "Module 1",
    createdAt: "2024-06-15",
    course: ["Course 1", "Course 2"],
    price: 5000,
    discount: 10,
    offerPrice: 4900,
    rating: 2,
    status: "Ongoing", 
     description:"The example description"
  },
];

export const dummyChapters = [
  {
    id: 1,
    name: "Chapter 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis repellat tempore quas eius quo minima non animi enim, et e",

    topics: [
      {
        id: 1,
        title: "Introduction",
        description: "Basic introduction to the chapter concepts",
      },
      {
        id: 2,
        title: "Core Concepts",
        description: "Detailed explanation of fundamental principles",
      },
    ],
  },
  {
    id: 2,
    name: "Chapter 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis repellat tempore quas eius quo minima non animi enim, et e",
    topics: [
      {
        id: 1,
        title: "Introduction",
        description: "Basic introduction to the chapter concepts",
      },
      {
        id: 2,
        title: "Core Concepts",
        description: "Detailed explanation of fundamental principles",
      },
    ],
  },
  {
    id: 3,
    name: "Chapter 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis repellat tempore quas eius quo minima non animi enim, et e",
    topics: [
      {
        id: 1,
        title: "Introduction",
        description: "Basic introduction to the chapter concepts",
      },
      {
        id: 2,
        title: "Core Concepts",
        description: "Detailed explanation of fundamental principles",
      },
    ],
  },
  {
    id: 4,
    name: "Chapter 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis repellat tempore quas eius quo minima non animi enim, et e",
    topics: [
      {
        id: 1,
        title: "Introduction",
        description: "Basic introduction to the chapter concepts",
      },
      {
        id: 2,
        title: "Core Concepts",
        description: "Detailed explanation of fundamental principles",
      },
    ],
  },
];

export const dummySessions = [
  {
    id: 1,
    date: "2025-06-01",
    title: "Intro to Web Development",
    attended: true,
    instructor: "John Doe",
    course: "Full Stack Web Dev Bootcamp",
    module: "Module 1: HTML & CSS",
    chapter: "Chapter 2: Semantic HTML",
  },
  {
    id: 2,
    date: "2025-05-30",
    title: "Flexbox Deep Dive",
    attended: false,
    instructor: "Jane Smith",
    course: "Full Stack Web Dev Bootcamp",
    module: "Module 2: CSS Layouts",
    chapter: "Chapter 1: Flexbox Basics",
  },
  {
    id: 3,
    date: "2025-05-28",
    title: "JS Fundamentals",
    attended: true,
    instructor: "Rahul Patel",
    course: "Full Stack Web Dev Bootcamp",
    module: "Module 3: JavaScript",
    chapter: "Chapter 1: Variables and Types",
  },
  {
    id: 4,
    date: "2025-05-26",
    title: "React Intro",
    attended: true,
    instructor: "Priya Sharma",
    course: "Javascript Bootcamp",
    module: "Module 1: React Basics",
    chapter: "Chapter 1: JSX & Components",
  },
  {
    id: 5,
    date: "2025-05-25",
    title: "Hooks in React",
    attended: false,
    instructor: "Priya Sharma",
    course: "Data Structures",
    module: "Module 2: Advanced React",
    chapter: "Chapter 2: useEffect in Depth",
  },
  {
    id: 6,
    date: "2025-05-23",
    title: "Node.js Crash Course",
    attended: true,
    instructor: "Ali Khan",
    course: "React Essentials",
    module: "Module 1: Getting Started",
    chapter: "Chapter 3: Express Basics",
  },
  {
    id: 7,
    date: "2025-05-21",
    title: "MongoDB Essentials",
    attended: false,
    instructor: "Ali Khan",
    course: "Python Mastery",
    module: "Module 2: Database Layer",
    chapter: "Chapter 1: Connecting with Mongoose",
  },
  {
    id: 8,
    date: "2025-05-19",
    title: "Deploying Full Stack Apps",
    attended: true,
    instructor: "John Doe",
    course: "Fullstack Development",
    module: "Module 3: CI/CD",
    chapter: "Chapter 2: Vercel & Netlify",
  },
];




export const dummyEnrolledCourseData = {
  id: 1,
  name: "Advanced React Development",
  description:
    "Master advanced React concepts including hooks, context, performance optimization, and modern patterns. Build production-ready applications with confidence.",
  progress: 65,
  modules: [
    {
      id: 1,
      name: "React Fundamentals",
      isPurchased: true,
      isCompleted: true,

      chapters: [
        {
          id: 1,
          name: "Introduction to React",
          isCompleted: true,
          duration: "25m",
          notes: [
            {
              id: 1,
              title: "React Basics Overview",
              videoUrl: ["https://www.youtube.com/embed/dGcsHMXbSOA"],
              files: [
                { name: "React_Basics.pdf", size: "2.1 MB" },
                { name: "Code_Examples.zip", size: "1.5 MB" },
              ],
            },
            {
              id: 2,
              title: "React Basics Overview",
              videoUrl: ["https://www.youtube.com/embed/dGcsHMXbSOA"],
              files: [
                { name: "React_Basics.pdf", size: "2.1 MB" },
                { name: "Code_Examples.zip", size: "1.5 MB" },
              ],
            },
          ],
        },
        {
          id: 2,
          name: "Components and JSX",
          isCompleted: true,

          notes: [
            {
              id: 1,
              title: "Understanding JSX",
              videoUrl:[ "https://www.youtube.com/embed/7fPXI_MnBOY","https://www.youtube.com/embed/7fPXI_MnBOY"],
              files: [{ name: "JSX_Guide.pdf", size: "1.8 MB" }],
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Advanced Hooks",
      isPurchased: true,
      isCompleted: false,

      chapters: [
        {
          id: 3,
          name: "useState and useEffect",
          isCompleted: false,
          duration: "45m",
          notes: [
            {
              id: 1,
              title: "State Management with Hooks",
              videoUrl: ["https://www.youtube.com/embed/O6P86uwfdR0"],
              files: [
                { name: "Hooks_Examples.pdf", size: "2.5 MB" },
                { name: "Practice_Code.zip", size: "3.2 MB" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 3,
      name: "Performance Optimization",
      isPurchased: false,
      isCompleted: false,

      chapters: [
        {
          id: 4,
          name: "React.memo and useMemo",
          isCompleted: false,
          duration: "40m",
          notes: [],
        },
      ],
    },
  ],
};


export const dummySupportCards = [
  {
    id: "1",
    name: "Prajyot Patil",
    designation: "Project Lead",
    department: "Project Management",
    contact: "+91 9876543210",
    email: "prajyot@example.com",
    availableTime: "Mon–Fri, 10 AM – 6 PM",
    description: "Handles technical issues and overall project guidance.",
  },
  {
    id: "2",
    name: "Sana Sheikh",
    designation: "Communication Trainer",
    department: "Communication",
    contact: "+91 9000012345",
    email: "sana.sheikh@example.com",
    availableTime: "Tue–Sat, 12 PM – 5 PM",
    description: "Helps with spoken English, presentation skills, and confidence building.",
  },
  {
    id: "3",
    name: "Harshit Mehta",
    designation: "Technical Support",
    department: "Back Office",
    contact: "+91 9988776655",
    email: "harshit.m@example.com",
    availableTime: "Mon–Fri, 2 PM – 8 PM",
    description: "Solves code errors, bugs, and tool issues students face.",
  },
  {
    id: "4",
    name: "Harshit Mehta",
    designation: "Technical Support",
    department: "Back Office",
    contact: "+91 9988776655",
    email: "harshit.m@example.com",
    availableTime: "Mon–Fri, 2 PM – 8 PM",
    description: "Solves code errors, bugs, and tool issues students face.",
  },
  {
    id: "5",
    name: "Kritika Sharma",
    designation: "Student Mentor",
    department: "Student Support",
    contact: "+91 8123456789",
    email: "kritika.mentor@example.com",
    availableTime: "Flexible – Responds within 24 hrs",
    description: "Guides on study plans, assignments, and emotional well-being.",
  },
  {
    id: "6",
    name: "Raghav Verma",
    designation: "Placement Coordinator",
    department: "Placement Cell",
    contact: "+91 7000099990",
    email: "raghav.v@example.com",
    availableTime: "Mon–Fri, 11 AM – 4 PM",
    description: "Prepares students for interviews and internships.",
  },
  {
    id: "7",
    name: "Raghav Verma",
    designation: "Placement Coordinator",
    department: "Back Office",
    contact: "+91 7000099990",
    email: "raghav.v@example.com",
    availableTime: "Mon–Fri, 11 AM – 4 PM",
    description: "Prepares students for interviews and internships.",
  },
];


export const dummyOffers: Offer[] = [
  {
    id: "offer1",
    title: "New Year Special",
    description: "Get flat ₹500 off on any course enrollment. Limited time only!",
    discountType: "flat",
    discountValue: 500,
    validFrom: "2025-01-01",
    validTill: "2025-01-10",
    applicableCourses: ["MERN Fullstack", "DSA Bootcamp"],
    isActive: true,
    image: "https://images.unsplash.com/photo-1606760727775-b2d2b2128e2e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "offer2",
    title: "Summer Sale",
    description: "20% off on all Web Development courses",
    discountType: "percentage",
    discountValue: 20,
    validFrom: "2025-06-01",
    validTill: "2025-06-30",
    applicableCourses: ["Frontend Mastery", "Backend Node.js"],
    isActive: true,
    image: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "offer3",
    title: "Referral Bonus",
    description: "Get ₹300 off when you join via a referral link!",
    discountType: "flat",
    discountValue: 300,
    validFrom: "2025-05-01",
    validTill: "2025-12-31",
    applicableCourses: ["All"],
    isActive: true,
    image: "https://images.unsplash.com/photo-1620712943543-f33ec90d9793?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "offer4",
    title: "Last Minute Deal",
    description: "Enroll before the batch starts & get 15% off!",
    discountType: "percentage",
    discountValue: 15,
    validFrom: "2025-06-20",
    validTill: "2025-06-25",
    applicableCourses: ["MERN Fullstack"],
    isActive: false,
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
  },
];

export const dummyNoteSessions = [
  {
    id: "s1",
    name: "JavaScript Basics",
    date: new Date(),
    module: "Module 1",
    chapter: "Intro to JS",
    instructor: "Arman Patel",
  },
  {
    id: "s2",
    name: "Loops & Conditions",
    date: new Date(new Date().setDate(new Date().getDate() - 1)),
    module: "Module 2",
    chapter: "Control Flow",
    instructor: "Sadaf A.",
  },
];


export const mockStudentData: Student = {
  id: 1,
  name: "Rahul Sharma",
  email: "rahul.sharma@email.com",
  phone: "+91 9876543210",
  courses: [
    {
      id: 1,
      name: "Full Stack Web Development",
      batch: "FSWD-2024-A",
      batchType: "hybrid",
      totalFees: 50000,
      paidFees: 30000,
      remainingFees: 20000,
      modules: [
        { id: 1, name: "HTML/CSS Basics", price: 8000, paid: true },
        { id: 2, name: "JavaScript Fundamentals", price: 12000, paid: true },
        { id: 3, name: "React Development", price: 15000, paid: true },
        { id: 4, name: "Node.js Backend", price: 10000, paid: false },
        { id: 5, name: "Database Design", price: 5000, paid: false }
      ],
      nextDueDate: "2024-08-15"
    },
    {
      id: 2,
      name: "Data Science Bootcamp",
      batch: "DS-2024-B",
      batchType: "online",
      totalFees: 75000,
      paidFees: 75000,
      remainingFees: 0,
      modules: [
        { id: 6, name: "Python Basics", price: 15000, paid: true },
        { id: 7, name: "Data Analysis", price: 20000, paid: true },
        { id: 8, name: "Machine Learning", price: 25000, paid: true },
        { id: 9, name: "Deep Learning", price: 15000, paid: true }
      ],
      nextDueDate: null
    }
  ],
  invoiceHistory: [
    {
      id: 1,
      date: "2024-06-15",
      amount: 15000,
      course: "Full Stack Web Development",
      module: "HTML/CSS Basics + JavaScript Fundamentals",
      paymentMethod: "upi",
      notes: "First installment payment"
    },
    {
      id: 2,
      date: "2024-07-01",
      amount: 15000,
      course: "Full Stack Web Development",
      module: "React Development",
      paymentMethod: "card",
      notes: "Second installment payment"
    },
    {
      id: 3,
      date: "2024-05-20",
      amount: 75000,
      course: "Data Science Bootcamp",
      module: "Complete Course Fee",
      paymentMethod: "cash",
      notes: "Full payment received"
    }
  ]
};


export const dummyInstructorTable = [
  {
    id: "1",
    name: "Ankit Verma",
    email: "ankit@example.com",
    phone: "9876543210",
    joinedAt: "2023-10-12",
    modules: ["Python", "Machine Learning"],
    batches: ["PY-2024-A", "ML-2024-B"],
  },
  {
    id: "2",
    name: "Sneha Reddy",
    email: "sneha@example.com",
    phone: "9123456780",
    joinedAt: "2024-01-05",
    modules: ["React", "JavaScript"],
    batches: ["RE-2024-A", "JS-2024-C"],
  },
  {
    id: "3",
    name: "Rohit Sharma",
    email: "rohit@example.com",
    phone: "9871234567",
    joinedAt: "2023-09-18",
    modules: ["Node.js", "Express"],
    batches: ["ND-2023-A", "EX-2023-B"],
  },
  {
    id: "4",
    name: "Meera Joshi",
    email: "meera@example.com",
    phone: "9812345678",
    joinedAt: "2024-02-22",
    modules: ["Python", "Data Analysis"],
    batches: ["PY-2024-B", "DA-2024-A"],
  },
  {
    id: "5",
    name: "Aditya Kulkarni",
    email: "aditya@example.com",
    phone: "9090909090",
    joinedAt: "2024-03-10",
    modules: ["JavaScript", "TypeScript"],
    batches: ["JS-2024-D", "TS-2024-A"],
  },
  {
    id: "6",
    name: "Neha Kapoor",
    email: "neha@example.com",
    phone: "9898989898",
    joinedAt: "2023-12-01",
    modules: ["React", "Redux"],
    batches: ["RE-2024-B", "RD-2024-C"],
  },
  {
    id: "7",
    name: "Deepak Nair",
    email: "deepak@example.com",
    phone: "9786543210",
    joinedAt: "2024-01-25",
    modules: ["DevOps", "Docker"],
    batches: ["DV-2024-A", "DK-2024-B"],
  },
  {
    id: "8",
    name: "Tanvi Desai",
    email: "tanvi@example.com",
    phone: "9654321876",
    joinedAt: "2024-02-14",
    modules: ["HTML/CSS", "UI Design"],
    batches: ["UI-2024-A", "HT-2024-C"],
  },
  {
    id: "9",
    name: "Karan Batra",
    email: "karan@example.com",
    phone: "9765432187",
    joinedAt: "2023-11-07",
    modules: ["Node.js", "MongoDB"],
    batches: ["ND-2023-C", "MDB-2023-B"],
  },
  {
    id: "10",
    name: "Ayesha Khan",
    email: "ayesha@example.com",
    phone: "9870001111",
    joinedAt: "2024-04-05",
    modules: ["Machine Learning", "Deep Learning"],
    batches: ["ML-2024-A", "DL-2024-A"],
  },
];
