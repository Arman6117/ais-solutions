import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, Trash2 } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

const CourseInstructorsCards = ({instructors}:{instructors:any[]}) => {
  return (
    <>
     <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Instructors</h2>
                <Button
                  size="sm"
                  className="flex items-center cursor-pointer gap-1 bg-primary-bg hover:bg-primary-bg/90"
                >
                  {/* //TODO:Add instructor Page */}
                  <Plus size={16} /> Add Instructor
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {instructors.map((instructor) => (
                  <Card
                    key={instructor.id}
                    className="border border-gray-200 hover:border-gray-300 transition-all"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={instructor.avatar}
                            alt={instructor.name}
                          />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {instructor.name.charAt(0) +
                              instructor.name.split(" ")[1]?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                          <h3 className="font-semibold">{instructor.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {instructor.email}
                          </p>
                          <Badge
                            variant="outline"
                            className="mt-1 bg-primary/5 border-primary/20 text-primary"
                          >
                            {instructor.role}
                          </Badge>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => toast.success("Instructor removed")}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {instructors.length === 0 && (
                <div className="text-center p-8 border border-dashed rounded-lg bg-gray-50">
                  <p className="text-muted-foreground">
                    No instructors assigned to this course yet.
                  </p>
                  <Button className="mt-2 bg-primary-bg hover:bg-primary-bg/90">
                    <Plus size={16} className="mr-1" /> Add Your First
                    Instructor
                  </Button>
                </div>
              )}
            </div>

    </>
  )
}

export default CourseInstructorsCards