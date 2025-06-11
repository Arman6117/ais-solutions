import { AccordionItem,AccordionContent,AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Lock, Play } from "lucide-react";
import ChapterItem from "./chapter-item";



type Files ={
    name:string,
    size:string
}
type Notes ={
    id:number,
    title:string,
    videoUrl:string,
    files:Files[]

}
type Chapter = {
  id:number,
  name:string,
  isCompleted:boolean
  notes:Notes[]
}
type Module = {
  id:number,
  name:string,
  isCompleted:boolean,
  isPurchased:boolean,
  chapters:Chapter[]
  
}
type ModuleAccordionProps = {
    module:Module
    courseName:string
}
const ModuleAccordion = ({ module,courseName}:ModuleAccordionProps ) => {
    return (
      <AccordionItem value={`module-${module.id}`} className="border rounded-lg px-4">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center justify-between w-full mr-4">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                module.isPurchased 
                  ? 'bg-gradient-to-br from-purple-500 to-indigo-600' 
                  : 'bg-gray-300'
              }`}>
                {module.isPurchased ? (
                  module.isCompleted ? (
                    <CheckCircle className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white" />
                  )
                ) : (
                  <Lock className="w-6 h-6 text-gray-600" />
                )}
              </div>
              <div className="text-left">
                <h3 className={`text-lg font-semibold ${!module.isPurchased ? 'text-gray-400' : ''}`}>
                  {module.name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  
                  <span>{module.chapters.length} chapters</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!module.isPurchased && (
                <Badge variant="destructive">Locked</Badge>
              )}
              {module.isCompleted && (
                <Badge variant="default" className="bg-green-500">Completed</Badge>
              )}
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-4">
          <div className="space-y-3">
            {module.chapters.map((chapter) => (
              <ChapterItem 
                key={chapter.id} 
                chapter={chapter} 
                courseName={courseName}
                moduleIsPurchased={module.isPurchased}
                
              />
            ))}
          </div>
          {!module.isPurchased && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 mb-3">
                Unlock this module to access all chapters and materials
              </p>
              <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600">
                Purchase Module - $29.99
              </Button>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    );
  };

  export default ModuleAccordion