import { IoBookOutline } from "react-icons/io5";
import { LuFileStack, LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineLocalOffer } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { Course } from "./types";

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
    label: "Modules",
    link: "/admin/modules",
    icon: LuFileStack,
  },
  {
    label: "Offers",
    link: "/admin/offers",
    icon: MdOutlineLocalOffer,
  },
  {
    label: "Students",
    link: "/admin/students",
    icon: PiStudent,
  },
];

export const sampleMeetings = [
  {
    _id: "1",
    date: "2025-04-01",
    course: "JavaScript Bootcamp",
    module: "Promise",
    batch: "Batch A",
    time: "10:00 AM",
  },
  {
    _id: "2",
    date: "2025-04-01",
    course: "Python Basics",
    module: "Datatypes",
    batch: "Batch B",
    time: "2:00 PM",
  },
  {
    _id: "3",
    date: "2025-04-04",
    course: "React Hooks",
    module: "useState",
    batch: "Batch C",
    time: "11:00 AM",
  },
  {
    _id: "4",
    date: "2025-04-06",
    course: "Data Structures",
    module: "Array",
    batch: "Batch A",
    time: "9:00 AM",
  },
  {
    _id: "5",
    date: "2025-04-10",
    course: "MongoDB Essentials",
    module: "Indexing",
    batch: "Batch D",
    time: "3:00 PM",
  },
  {
    _id: "6",
    date: "2025-04-11",
    course: "Node.js Advanced",
    module: "Async Await",
    batch: "Batch A",
    time: "12:00 PM",
  },
  {
    _id: "7",
    date: "2025-04-26",
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
    description:'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    createdAt: "2024-04-10",
    students: 120,
    batches: 5,
    batchesCompleted: 2,
    price:1000,

    modules: ["Introduction", "Variables", "Functions", "Objects", "Arrays"],
    batchesName: ["Batch A", "Batch B", "Batch C"],
    instructors: ["Arman Patel", "Robin Teach"],
  },
  {
    id: "2",
    name: "React Essentials",
    description:'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',

    createdAt: "2024-03-15",
    students: 80,
    batches: 3,
    batchesCompleted: 2,
    price:1000,
    modules: ["Introduction", "Variables", "Functions", "Objects", "Arrays"],
    batchesName: ["Batch A", "Batch B", "Batch C"],
    instructors: ["Arman Patel", "Robin Teach"],
  },
  {
    id: "3",
    name: "Data Structures",
    description:'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',

    createdAt: "2024-02-05",
    students: 60,
    batches: 4,
    batchesCompleted: 2,
    price:1000,
    modules: ["Introduction", "Variables", "Functions", "Objects", "Arrays"],
    batchesName: ["Batch A", "Batch B", "Batch C"],
    instructors: ["Arman Patel", "Robin Teach"],
  },
  {
    id: "4",
    name: "Python Mastery",
    description:'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',

    createdAt: "2024-01-22",
    students: 100,
    batches: 6,
    batchesCompleted: 1,
    price:1000,
    modules: ["Introduction", "Variables", "Functions", "Objects", "Arrays"],
    batchesName: ["Batch A", "Batch B", "Batch C"],
    instructors: ["Arman Patel", "Robin Teach"],
  },
  {
    id: "5",
    name: "MongoDB Crash Course",
    description:'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',

    createdAt: "2024-01-10",
    students: 70,
    batches: 2,
    batchesCompleted: 2,
    price:1000,
    modules: ["Introduction", "Variables", "Functions", "Objects", "Arrays"],
    batchesName: ["Batch A", "Batch B", "Batch C"],
    instructors: ["Arman Patel", "Robin Teach"],
  },
  {
    id: "6",
    name: "Fullstack Development",
    description:'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',

    createdAt: "2024-01-02",
    students: 90,
    batches: 5,
    batchesCompleted: 4,
    price:1000,
    modules: ["Introduction", "Variables", "Functions", "Objects", "Arrays"],
    batchesName: ["Batch A", "Batch B", "Batch C"],
    instructors: ["Arman Patel", "Robin Teach"],
  },
];
