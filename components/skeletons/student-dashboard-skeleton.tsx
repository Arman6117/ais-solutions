import React from 'react';

const DashboardSkeleton = () => {
  return (
    <div className="flex w-full animate-pulse gap-4">
      {/* Left Column Skeleton */}
      <div className="flex flex-col">
        <div className="h-10 bg-gray-200 rounded w-80 mb-4"></div> {/* Course Selector */}
        <div className="mt-5 h-64 bg-gray-200 rounded w-80"></div> {/* Lecture Schedule */}
      </div>
      {/* Right Column Skeleton */}
      <div className="flex flex-col gap-5 w-full h-dvh rounded-lg p-5 bg-gray-100">
        <div className="flex gap-8">
          <div className="h-32 bg-gray-200 rounded-lg w-1/2"></div> {/* Student Card */}
          <div className="h-32 bg-gray-200 rounded-lg w-1/2"></div> {/* Course Data Card */}
        </div>
        <div className="h-48 bg-gray-200 rounded-lg w-full"></div> {/* Student Batches */}
      </div>
    </div>
  );
};

export default DashboardSkeleton;