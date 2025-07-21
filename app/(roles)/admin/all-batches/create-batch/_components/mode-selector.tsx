import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'
type ModeSelectorProps = {
    handleInputChange:(field:string,value:string) => void;
}
const ModeSelector = ({handleInputChange}:ModeSelectorProps) => {
  return (
    <div className="space-y-2">
    <Label htmlFor="mode">Batch Mode</Label>
     <Select
      onValueChange={(value) => {

        handleInputChange("mode", value);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select batch mode" />
      </SelectTrigger>
      <SelectContent>
     
          <SelectItem  value={"offline"}>
            Offline
          </SelectItem>
          <SelectItem  value={"online"}>
            Online
          </SelectItem>
          <SelectItem  value={"hybrid"}>
            Hybrid
          </SelectItem>
   
      </SelectContent>
    </Select>
  </div>
  )
}

export default ModeSelector