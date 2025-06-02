'use client'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { BookOpen, Calendar, Clock, Users, Video } from 'lucide-react'
import React, { useState } from 'react'

type LectureScheduleCardProps = {
    day:'today' | "tomorrow"
}
const LectureScheduleCard = ({day}:LectureScheduleCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
  return (

    
      <div 
        className={`relative w-64 sm:w-96  max-w-full bg-soft-white rounded-xl shadow-primary-bg/10 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer group overflow-hidden`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Purple header with improved styling */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 px-6 py-4 relative">
          <div className="flex items-center justify-between">
            <h3 className="text-white text-lg font-semibold">Meeting name</h3>
            <div className="flex items-center space-x-2">
             
              <Button size={'sm'} className='' variant={'outline'}>
              <Video className="w-4 h-4 text-/80" /> 
                Join</Button>
            </div>
          </div>
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
  
        {/* Card content with better spacing and typography */}
        <div className="p-6 space-y-4">
          {/* Course and Batch row */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-purple-600" />
                <span className="text-gray-500 text-xs font-medium uppercase tracking-wide">Course</span>
              </div>
              <p className="text-gray-900 font-semibold text-sm">Course name</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-purple-600" />
                <span className="text-gray-500 text-xs font-medium uppercase tracking-wide">Batch</span>
              </div>
              <p className="text-gray-900 font-semibold text-sm">Batch name</p>
            </div>
          </div>
  
          {/* Module and Time row */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-purple-600" />
                <span className="text-gray-500 text-xs font-medium uppercase tracking-wide">Module</span>
              </div>
              <p className="text-gray-900 font-semibold text-sm">Module name</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-purple-600" />
                <span className="text-gray-500 text-xs font-medium uppercase tracking-wide">Time</span>
              </div>
              <p className="text-gray-900 font-bold text-lg">11:30pm</p>
            </div>
          </div>
        </div>
  
        {/* Subtle hover border effect */}
        <div className={`absolute inset-0 rounded-xl border-2 border-purple-200 transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
      </div>
  )
}

export default LectureScheduleCard