import { IoBookOutline } from "react-icons/io5";
import { LuFileStack, LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineLocalOffer } from "react-icons/md";
import { PiStudent } from "react-icons/pi";

export const adminSidebarLinks = [
    {
        label: 'Dashboard',
        link: '/admin/dashboard',
        icon: LuLayoutDashboard
    },
    {
        label: 'Courses',
        link: '/admin/courses',
        icon: IoBookOutline
    },
    {
        label: 'Modules',
        link: '/admin/modules',
        icon: LuFileStack
    },
    {
        label: 'Offers',
        link: '/admin/offers',
        icon: MdOutlineLocalOffer
    },
    {
        label: 'Students',
        link: '/admin/students',
        icon: PiStudent
    },
]