import React from "react";
import { Calendar, Check, CheckCircle, Clock, Eye, Pencil, Play, Trash2, User, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { BatchModules } from "@/lib/types/types";
import AddInstructorButton from "@/app/(roles)/admin/courses/_components/add-instructor-button";
import { ModuleEditData, ModuleStatus } from "./modules-card";

interface StatusConfig {
  label: string;
  color: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  bgGradient: string;
}

const statusConfig: Record<ModuleStatus, StatusConfig> = {
  Ongoing: {
    label: "Ongoing",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: Play,
    bgGradient: "from-blue-50 to-blue-100",
  },
  Upcoming: {
    label: "Upcoming",
    color: "bg-amber-100 text-amber-800 border-amber-200",
    icon: Clock,
    bgGradient: "from-amber-50 to-amber-100",
  },
  Completed: {
    label: "Completed",
    color: "bg-emerald-100 text-emerald-800 border-emerald-200",
    icon: CheckCircle,
    bgGradient: "from-emerald-50 to-emerald-100",
  },
};

interface ModuleCardProps {
  module: BatchModules;
  isEditing: boolean;
  moduleEditData: ModuleEditData;
  onEdit: () => void;
  onDelete: () => void;
  onSave: () => void;
  onCancel: () => void;
  onStatusChange: (status: ModuleStatus) => void;
  onEditDataChange: (updates: Partial<ModuleEditData>) => void;
  onAddInstructor?: () => void;
}

export default function ModuleCard({
  module,
  isEditing,
  moduleEditData,
  onEdit,
  onDelete,
  onSave,
  onCancel,
  onStatusChange,
  onEditDataChange,
  onAddInstructor,
}: ModuleCardProps) {
  const StatusIcon = statusConfig[module.status].icon;

  const handleDateChange = (field: 'startDate' | 'endDate', value: string) => {
    onEditDataChange({ [field]: value });
  };

  const displayStatus = isEditing && moduleEditData.status ? moduleEditData.status : module.status;

  return (
    <div className="group bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-all duration-300 hover:border-indigo-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors">
              {module.name}
            </h3>
            <div
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                statusConfig[displayStatus].color
              }`}
            >
              <StatusIcon size={12} className="inline mr-1" />
              {statusConfig[displayStatus].label}
            </div>
          </div>

          <div className="text-sm text-gray-600 flex gap-4 flex-col">
            <div className="flex items-center gap-1">
              <User size={14} />
              <span className="font-medium">Instructor name</span>
              {isEditing && (
                <AddInstructorButton
                  className="size-7 ml-10"
                  showLabel={false}
                  setInstructor={(instructor) => 
                    onEditDataChange({ 
                      instructor: Array.isArray(instructor) ? instructor : [instructor] 
                    })
                  }
                />
              )}
            </div>
            <div className="flex items-center gap-1">
              <Users size={14} />
              <span>{module.numberOfStudent} students</span>
            </div>
          </div>
        </div>

        {!isEditing && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="ghost"
              className="text-gray-500 hover:text-indigo-600 hover:bg-indigo-50"
            >
              <Eye size={16} />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-gray-500 hover:text-indigo-600 hover:bg-indigo-50"
              onClick={onEdit}
            >
              <Pencil size={16} />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-gray-500 hover:text-red-600 hover:bg-red-50"
              onClick={onDelete}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-between text-sm text-gray-600 gap-4 mb-3">
        <div className="flex items-center gap-2">
          <Calendar size={14} />
          <span>Start:</span>
          {!isEditing ? (
            <span className="font-medium text-gray-800">
              {module.startDate
                ? format(new Date(module.startDate), "PP")
                : "No date provided"}
            </span>
          ) : (
            <Input
              type="date"
              value={moduleEditData.startDate || module.startDate || ""}
              onChange={(e) => handleDateChange('startDate', e.target.value)}
              className="w-auto"
            />
          )}
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={14} />
          <span>End:</span>
          {!isEditing ? (
            <span className="font-medium text-gray-800">
              {module.endDate
                ? format(new Date(module.endDate), "PP")
                : "No date provided"}
            </span>
          ) : (
            <Input
              type="date"
              value={moduleEditData.endDate || module.endDate || ""}
              onChange={(e) => handleDateChange('endDate', e.target.value)}
              className="w-auto"
            />
          )}
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
            <span className="text-sm text-gray-600 mr-2">Change status:</span>
            {(Object.entries(statusConfig) as Array<[ModuleStatus, StatusConfig]>).map(
              ([status, config]) => (
                <Button
                  key={status}
                  size="sm"
                  variant={displayStatus === status ? "default" : "outline"}
                  className={`text-xs ${
                    displayStatus === status
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => onStatusChange(status)}
                >
                  <config.icon size={12} className="mr-1" />
                  {config.label}
                </Button>
              )
            )}
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              className="bg-indigo-600 text-white hover:bg-indigo-700"
              onClick={onSave}
            >
              <Check size={16} />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="cursor-pointer bg-muted hover:bg-gray-200"
              onClick={onCancel}
            >
              <X size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}