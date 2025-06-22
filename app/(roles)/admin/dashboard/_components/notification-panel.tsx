"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BellIcon,
  ArrowRightCircle,
  CheckCircle,
  Clock10,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type Notification = {
  id: string;
  studentName: string;
  courseId: string;
  courseName: string;
  message: string;
  isApproved: boolean;
};

const initialNotifications: Notification[] = [
  {
    id: "1",
    studentName: "Arjun Mehta",
    courseId: "react101",
    courseName: "React Mastery",
    message: "wants to join the course",
    isApproved: false,
  },
  {
    id: "2",
    studentName: "Sara Khan",
    courseId: "node200",
    courseName: "Node.js Bootcamp",
    message: "requested to join",
    isApproved: true,
  },
];

const NotificationPanel = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleViewRequest = (courseId: string) => {
    router.push(`/admin/courses/${courseId}`);
  };

  const hasPending = notifications.some((n) => !n.isApproved);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-14 h-10 cursor-pointer p-2 relative">
          <BellIcon className="size-6 text-violet-600" />
          {hasPending && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[340px] max-h-[340px] overflow-y-auto p-2 rounded-xl border shadow-lg bg-white">
        <DropdownMenuLabel className="text-base text-gray-800 px-2 mb-1">
          Notifications
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {notifications.length === 0 ? (
          <DropdownMenuItem disabled className="text-sm text-gray-500 px-3 py-2">
            No notifications
          </DropdownMenuItem>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 mb-2 rounded-md transition-all shadow-sm border ${
                notification.isApproved
                  ? "bg-green-50 border-green-100"
                  : "bg-yellow-50 border-yellow-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {notification.studentName}
                  </p>
                  <p className="text-xs text-gray-600">
                    {notification.message} <b>{notification.courseName}</b>
                  </p>
                </div>
                <div className="ml-2">
                  {notification.isApproved ? (
                    <CheckCircle className="text-green-600 size-5" />
                  ) : (
                    <Clock10 className="text-yellow-500 size-5" />
                  )}
                </div>
              </div>

              {!notification.isApproved && (
                <div className="mt-3 text-right">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="text-xs px-3 py-1 flex items-center gap-1"
                    onClick={() => handleViewRequest(notification.courseId)}
                  >
                    <ArrowRightCircle className="size-4" />
                    View Request
                  </Button>
                </div>
              )}
            </div>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationPanel;
