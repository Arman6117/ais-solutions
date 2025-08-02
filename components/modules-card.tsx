import React, { useEffect, useState } from "react";
import {
  BookOpen,
  Calendar,
  Check,
  CheckCircle,
  Clock,
  Eye,
  Pencil,
  Play,
  Plus,
  Trash2,
  User,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BatchModules, Modules } from "@/lib/types/types";
import { format } from "date-fns";
import { Input } from "./ui/input";
import AddInstructorButton from "@/app/(roles)/admin/courses/_components/add-instructor-button";
import AddModuleButton from "./add-module-button";
import { getAllModulesNames } from "@/actions/admin/modules/get-modules";

type ModuleStatus = "Ongoing" | "Upcoming" | "Completed";

interface StatusConfig {
  label: string;
  color: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  bgGradient: string;
}

interface ModulesCardProps {
  modules: BatchModules[];
  name?: string;
  batchId: string;
  mode: "view" | "edit";
  setModuleIds: (ids:Modules[])=> void
  onModuleDelete?: (moduleId: string) => void;
  
  onAddInstructor?: () => void;
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

type ModuleEditData = {
  startDate?: string;
  endDate?: string;
  instructor?: string[];
  status?: ModuleStatus;
};
const ModulesCard: React.FC<ModulesCardProps> = ({
  modules: propModules,
  name = "Course",
  setModuleIds,
  mode,
  onAddInstructor,
  batchId,
}) => {
  const [modules, setModules] = useState<BatchModules[]>(propModules);
  const [availableModules, setAvailableModules] = useState<Modules[] | []>([]);
  const [filter, setFilter] = useState<ModuleStatus | "all">("all");
  const [moduleForEdit, setModuleForEdit] = useState<BatchModules | []>([]);
  const [moduleEditData, setModuleEditData] = useState<ModuleEditData | null>(
    null
  );
  const [isEditing, setIsEditing] = useState(false);
  const [instructor, setIsInstructor] = useState("");
  const fetchAvailableModule = async () => {
    try {
      const res = await getAllModulesNames();
      if (res.success && res.data) {
        const filteredModules = res.data.filter((mod)=> {
          !modules.some((m:{id:string})=> m.id === mod._id)
        })

        setAvailableModules(filteredModules)
      } else {
        setAvailableModules([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAvailableModule();
  }, []);
  const handleStatusChange = (moduleId: string, newStatus: ModuleStatus) => {
    setModules((prev) =>
      prev.map((m) => (m.id === moduleId ? { ...m, status: newStatus } : m))
    );
    if (isEditing) {
      setModuleEditData({ status: newStatus });
    }
  };

  const handleDelete = (moduleId: string) => {
    setModules((prev) => prev.filter((m) => m.id !== moduleId));
  
  };

  const handleEdit = (module: BatchModules) => {
    setIsEditing(true);
    setModuleForEdit(module);
    setModuleEditData({
      endDate: module.endDate,
      instructor: module.instructor,
      startDate: module.startDate,
      status: module.status,
    });
  };

  const handleSave = () => {
    setIsEditing(false);
  };
  const statusCounts = {
    all: modules.length,
    ongoing: modules.filter((m) => m.status === "Ongoing").length,
    upcoming: modules.filter((m) => m.status === "Upcoming").length,
    completed: modules.filter((m) => m.status === "Completed").length,
  };

  const filteredModules =
    filter === "all"
      ? modules
      : modules.filter((module) => module.status === filter);

  const filterTabs = [
    { key: "all", label: "All", count: statusCounts.all },
    { key: "Ongoing", label: "Ongoing", count: statusCounts.ongoing },
    { key: "Upcoming", label: "Upcoming", count: statusCounts.upcoming },
    { key: "Completed", label: "Completed", count: statusCounts.completed },
  ];

  return (
    <Card className="border-0 shadow-xl rounded-3xl overflow-hidden bg-white">
      <CardHeader className="bg-gradient-to-br rounded-md from-primary-bg via-purple-600 to-primary-bg text-white py-6 px-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
              <BookOpen size={24} className="text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold tracking-tight">
                {name} Modules
              </CardTitle>
              <p className="text-indigo-100 text-sm font-medium mt-1">
                {modules.length} modules • {statusCounts.ongoing} active
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {mode === "edit" && (
              <AddModuleButton
                className="bg-white text-indigo-600 hover:bg-indigo-50 border border-indigo-200 font-medium"
                modules={availableModules}
                setModules={setModuleIds}
              />
            )}
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          {filterTabs.map(({ key, label, count }) => (
            <Button
              key={key}
              onClick={() => setFilter(key as ModuleStatus | "all")}
              className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                filter === key
                  ? "bg-white text-indigo-600 shadow-lg"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {label} ({count})
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          {filteredModules.length > 0 ? (
            filteredModules.map((module) => {
              const StatusIcon = statusConfig[module.status].icon;
              return (
                <div
                  key={module.id}
                  className="group bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-all duration-300 hover:border-indigo-200"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {module.name}
                        </h3>
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                            statusConfig[module.status].color
                          }`}
                        >
                          <StatusIcon size={12} className="inline mr-1" />
                          {statusConfig[module.status].label}
                        </div>
                      </div>

                      <div className="text-sm text-gray-600 flex gap-4 flex-col">
                        <div className="flex items-center gap-1 ">
                          <User size={14} />
                          <span className="font-medium">Instructor name</span>
                          {isEditing && (
                            <AddInstructorButton
                              className="size-7 ml-10"
                              showLabel={false}
                              setInstructor={setIsInstructor}
                            />
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={14} />
                          <span>{module.numberOfStudent} students</span>
                        </div>
                      </div>
                    </div>

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
                        onClick={() => handleEdit(module)}
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-gray-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleDelete(module.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-between text-sm text-gray-600 gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>Start:</span>
                      {!isEditing ? (
                        <span className="font-medium text-gray-800">
                          {module.startDate
                            ? format(module.startDate, "PP")
                            : "No date provided"}
                        </span>
                      ) : (
                        <Input
                          type="date"
                          // value={moduleEditData?.startDate}
                          onChange={(e) =>
                            setModuleEditData({ startDate: e.target.value })
                          }
                        />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>End:</span>
                      {!isEditing ? (
                        <span className="font-medium text-gray-800">
                          {module.endDate
                            ? format(module.endDate, "PP")
                            : "No date provided"}
                        </span>
                      ) : (
                        <Input
                          type="date"
                          // value={moduleEditData?.endDate}
                          onChange={(e) =>
                            setModuleEditData({ endDate: e.target.value })
                          }
                        />
                      )}
                    </div>
                  </div>
                  {isEditing && (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                        <span className="text-sm text-gray-600 mr-2">
                          Change status:
                        </span>
                        {(
                          Object.entries(statusConfig) as Array<
                            [ModuleStatus, StatusConfig]
                          >
                        ).map(([status, config]) => (
                          <Button
                            key={status}
                            size="sm"
                            variant={
                              module.status === status ? "default" : "outline"
                            }
                            className={`text-xs ${
                              module.status === status
                                ? "bg-indigo-600 hover:bg-indigo-700"
                                : "hover:bg-gray-50"
                            }`}
                            onClick={() =>
                              handleStatusChange(module.id, status)
                            }
                          >
                            <config.icon size={12} className="mr-1" />
                            {config.label}
                          </Button>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        <Button
                          size={"sm"}
                          className="bg-indigo-600 text-white"
                          onClick={handleSave}
                        >
                          <Check />
                        </Button>
                        <Button
                          size={"sm"}
                          variant={"ghost"}
                          className="cursor-pointer bg-muted"
                          onClick={() => setIsEditing(false)}
                        >
                          <X />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border-2 border-dashed border-gray-300">
                <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  No modules found
                </h3>
                <p className="text-gray-500 text-sm mb-6">
                  {filter === "all"
                    ? "No modules have been added yet. Create your first module to get started."
                    : `No ${filter} modules at the moment.`}
                </p>

                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Plus size={16} className="mr-2" />
                  Add Your First Module
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModulesCard;
