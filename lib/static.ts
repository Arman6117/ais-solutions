import { IoBookOutline } from "react-icons/io5";
import { LuFileStack, LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineLocalOffer } from "react-icons/md";
import { PiStudent } from "react-icons/pi";

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

export const coursesData = [
  {
    id: 1,
    name: "JavaScript Bootcamp",
    createdAt: "2024-04-10",
    students: 120,
    batches: 5,
  },
  {
    id: 2,
    name: "React Essentials",
    createdAt: "2024-03-15",
    students: 80,
    batches: 3,
  },
  {
    id: 3,
    name: "Data Structures",
    createdAt: "2024-02-05",
    students: 60,
    batches: 4,
  },
  {
    id: 4,
    name: "Python Mastery",
    createdAt: "2024-01-22",
    students: 100,
    batches: 6,
  },
  {
    id: 5,
    name: "MongoDB Crash Course",
    createdAt: "2024-01-10",
    students: 70,
    batches: 2,
  },
  {
    id: 6,
    name: "Fullstack Development",
    createdAt: "2024-01-02",
    students: 90,
    batches: 5,
  },
];
