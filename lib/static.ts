import { IoBookOutline } from "react-icons/io5";
import { LuFileStack, LuLayoutDashboard, LuSchool } from "react-icons/lu";
import { MdOutlineLocalOffer } from "react-icons/md";
import {
  PiChalkboardTeacher,
  PiFolderSimpleUser,
  PiStudent,
} from "react-icons/pi";
import { Course, DummyBatches, DummyInstructors, DummyStudent } from "./types";
import { UserCircleIcon } from "lucide-react";
import { FaUser } from "react-icons/fa";

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
    label: "Students",
    link: "/admin/students",
    icon: PiStudent,
  },
  {
    label: "Offers",
    link: "/admin/offers",
    icon: MdOutlineLocalOffer,
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
    date: "2025-06-01",
    course: "JavaScript Bootcamp",
    module: "Promise",
    batch: "Batch A",
    time: "10:00 AM",
  },
  {
    _id: "2",
    date: "2025-05-01",
    course: "Python Basics",
    module: "Datatypes",
    batch: "Batch B",
    time: "2:00 PM",
  },
  {
    _id: "3",
    date: "2025-06-04",
    course: "React Hooks",
    module: "useState",
    batch: "Batch C",
    time: "11:00 AM",
  },
  {
    _id: "4",
    date: "2025-06-06",
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
    date: "2025-06-26",
    course: "Next.js 15",
    module: "Dynamic Routing",
    batch: "Batch B",
    time: "10:00 AM",
  },
];

export const ongoingCourses = [
  {
    courseName: "JavaScript Bootcamp",
    batchName: "Batch A",
    lectureNumber: 12,
    module: "Promise",
    instructor: "Mr. Arman Patel",
  },
  {
    courseName: "React.js Mastery",
    batchName: "Batch B",
    lectureNumber: 8,
    module: "useState",
    instructor: "Ms. Robin Teach",
  },
  {
    courseName: "Python for Data Science",
    batchName: "Batch C",
    lectureNumber: 5,
    module: "Datatypes",
    instructor: "Mr. Zoro Bytes",
  },
  {
    courseName: "MongoDB Essentials",
    batchName: "Batch D",
    lectureNumber: 15,
    module: "Indexing",
    instructor: "Dr. Nami Data",
  },
  {
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

export const dummyModules = [
  {
    id: "1",
    name: "Module 1",
    createdAt: "2024-06-15",
    course: ["Course 1", "Course 2", "Course 3", "Course 4"],
    price: 1000,
    discount: 10,
    offerPrice: 900,
    rating: 4.5,
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
    course: "React Mastery",
    module: "Module 1: React Basics",
    chapter: "Chapter 1: JSX & Components",
  },
  {
    id: 5,
    date: "2025-05-25",
    title: "Hooks in React",
    attended: false,
    instructor: "Priya Sharma",
    course: "React Mastery",
    module: "Module 2: Advanced React",
    chapter: "Chapter 2: useEffect in Depth",
  },
  {
    id: 6,
    date: "2025-05-23",
    title: "Node.js Crash Course",
    attended: true,
    instructor: "Ali Khan",
    course: "Backend Development with Node.js",
    module: "Module 1: Getting Started",
    chapter: "Chapter 3: Express Basics",
  },
  {
    id: 7,
    date: "2025-05-21",
    title: "MongoDB Essentials",
    attended: false,
    instructor: "Ali Khan",
    course: "Backend Development with Node.js",
    module: "Module 2: Database Layer",
    chapter: "Chapter 1: Connecting with Mongoose",
  },
  {
    id: 8,
    date: "2025-05-19",
    title: "Deploying Full Stack Apps",
    attended: true,
    instructor: "John Doe",
    course: "DevOps for Developers",
    module: "Module 3: CI/CD",
    chapter: "Chapter 2: Vercel & Netlify",
  },
];


export const dummyStudentProfile ={
  name: "Rohan Sharma",
  email: "rohan@example.com",
  number: "+91 9876543210",
  image: "https://placehold.co/120x120",
  totalFees: 15000,
  paidFees: 10000,
  courses: [
    {
      id:1,
      name: "Full Stack Web Development",
      total: 8000,
      paid: 8000,
      status: "Completed",
      batch: "Batch A",
      approved: true,
    },
    {
      id:2,
      name: "Data Structures & Algorithms",
      total: 7000,
      paid: 2000,
      status: "Ongoing",
      batch: "Batch B",
      approved: true,
    },
    {
      id:3,
      name: "DevOps Fundamentals",
      total: 5000,
      paid: 0,
      status: "Ongoing",
      batch: "Batch C",
      approved: false,
    },
  ],
}


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
