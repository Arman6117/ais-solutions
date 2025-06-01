import { Tabs,TabsContent,TabsList,TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import LectureScheduleCard from './lecture-schedule-card'

const LectureScheduleTab = () => {
  return (
    <Tabs className=''defaultValue='today' orientation='horizontal' >
        <TabsList className='space-x-11 bg-transparent'>
            <TabsTrigger className='text-lg p-5' value='today'>Today</TabsTrigger>
            <TabsTrigger className='text-lg p-5'value='tomorrow'>Tomorrow</TabsTrigger>
        </TabsList>
        <TabsContent value='today' className='px-3 py-3'>
            <LectureScheduleCard day="today"/>
        </TabsContent>
        <TabsContent value='tomorrow'>
            Hello
        </TabsContent>
    </Tabs>
  )
}

export default LectureScheduleTab