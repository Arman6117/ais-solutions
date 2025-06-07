import { Avatar,AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import DisplayRating from "@/components/display-rating";
import React from "react";
import { cn } from "@/lib/utils";


export const dummyReviews = [
    {
      id: 1,
      name: "Aryan Mehta",
      rating: 4.5,
      time: "2 days ago",
      comment: "The instructor explained everything clearly. Great for beginners!"
    },
    {
      id: 2,
      name: "Sneha Kapoor",
      rating: 3.8,
      time: "1 week ago",
      comment: "Good content but needs more real-world examples."
    },
    {
      id: 3,
      name: "Rohit Sharma",
      rating: 5.0,
      time: "3 weeks ago",
      comment: "Excellent course! Learned a lot and the modules are well structured."
    },
    {
      id: 4,
      name: "Fatima Shaikh",
      rating: 4.2,
      time: "4 days ago",
      comment: "Good pace and explanations. Some modules were a bit short though."
    },
    {
      id: 5,
      name: "Aman Gupta",
      rating: 2.9,
      time: "5 days ago",
      comment: "Expected more advanced content. Suitable only for complete beginners."
    },
    {
      id: 6,
      name: "Kavya Nair",
      rating: 4.7,
      time: "1 day ago",
      comment: "Very helpful! Especially liked the assignments after each module."
    },
    {
      id: 7,
      name: "Yash Raj",
      rating: 3.5,
      time: "2 weeks ago",
      comment: "Decent course, but could use better visuals and diagrams."
    },
    {
      id: 8,
      name: "Neha Suresh",
      rating: 4.9,
      time: "10 hours ago",
      comment: "Loved it! Very interactive and engaging."
    },
    {
      id: 9,
      name: "Tanmay Joshi",
      rating: 3.0,
      time: "6 days ago",
      comment: "Okay experience. Some parts were too fast-paced."
    },
    {
      id: 10,
      name: "Priya Verma",
      rating: 4.0,
      time: "3 days ago",
      comment: "Great structure. Could use more quizzes or practice problems."
    }
  ];
  
type StudentCourseReviewsProps = {
  course?: any;
  className:string
};
const StudentCourseReviews = ({className,course}:StudentCourseReviewsProps) => {
  return (
    <div className={cn("flex flex-col mt-5", className)}>
      <div className="flex gap-2 items-center">
        <Star className="text-amber-700 fill-amber-700 size-4" />
        <h3 className="text-2xl font-medium">4.7 Course Rating</h3>
      </div>
      <div className="grid  sm:grid-cols-2 gap-6 mt-5 grid-cols-1">
        {dummyReviews.map((review)=> (
            <div key={review.id} className="flex p-3 flex-col">
                <div className="flex gap-3 items-center border-t border-t-muted-foreground py-4">
                    <Avatar className="size-14">
                      <AvatarImage      src={"https://placehold.co/80x80"}/>
                    </Avatar>
                    <div className="flex flex-col justify-center">
                      <h1 className="text-lg font-medium">{review.name}</h1>
                      <div className="flex gap-3 items-center">

                      <DisplayRating value={review.rating}  size={12}/>
                      <span className="text-xs font-medium">{review.time}</span>
                      </div>
                    </div>
                </div>
                <p className="text-sm mt-2 text-neutral-800 max-w-60">
                  {review.comment}
                </p>

            </div>
        ))}
      </div>
    </div>
  );
};

export default StudentCourseReviews;
