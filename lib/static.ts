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

export const sampleOngoingCourse = [{}];
