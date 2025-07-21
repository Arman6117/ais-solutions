import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'
type TypeSelectorProps = {
    handleInputChange:(field:string,value:string) => void;
}
const TypeSelector = ({handleInputChange}:TypeSelectorProps) => {
  return (
    <div className="space-y-2">
    <Label htmlFor="type">Batch Type</Label>
     <Select
      onValueChange={(value) => {

        handleInputChange("type", value);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select batch type" />
      </SelectTrigger>
      <SelectContent>
     
          <SelectItem  value={"weekdays"}>
            Weekdays
          </SelectItem>
          <SelectItem  value={"weekend"}>
            Weekend
          </SelectItem>
   
      </SelectContent>
    </Select>
  </div>
  )
}

export default TypeSelector