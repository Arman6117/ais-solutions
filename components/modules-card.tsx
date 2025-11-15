import React, { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BatchModules, Modules } from "@/lib/types/types";
import { toast } from "sonner";

import { getAllModulesNames } from "@/actions/admin/modules/get-modules";
import { addModules } from "@/actions/admin/batches/add-module";
import AddModuleButton from "./add-module-button";
import ModuleCard from "./module-card";
import FilterTabs from "./filter-tab";
import EmptyState from "./empaty-state";
import { updateModuleForBatch } from "@/actions/admin/batches/update-module";
import { deleteBatchModule } from "@/actions/admin/batches/delete-batch-module";
import { useRouter } from "next/navigation";

export type ModuleStatus = "Ongoing" | "Upcoming" | "Completed";

export interface ModuleEditData {
  startDate?: string;
  endDate?: string;
  instructor?: string[];
  status?: ModuleStatus;
}

interface ModulesCardProps {
  modules: BatchModules[];
  name?: string;
  batchId: string;
  mode: "view" | "edit";
  setModuleIds: (ids: Modules[]) => void;
  onModuleDelete?: (moduleId: string) => void;
  onAddInstructor?: () => void;
}

const ModulesCard: React.FC<ModulesCardProps> = ({
  modules: propModules,
  name = "Course",
  setModuleIds,
  mode,
  onAddInstructor,
  batchId,
}) => {
  const [modules, setModules] = useState<BatchModules[]>(propModules);
  const [availableModules, setAvailableModules] = useState<Modules[]>([]);
  const [filter, setFilter] = useState<ModuleStatus | "all">("all");
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [moduleEditData, setModuleEditData] = useState<ModuleEditData>({});
  const router = useRouter();

  const addNewModules = async (ids: string[]) => {
    try {
      const res = await addModules(ids, batchId);
      if (!res.success) {
        toast.error(res.message);
      } else {
        console.log("Called");
        router.refresh();
        toast.success(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const fetchAvailableModule = async () => {
    try {
      const res = await getAllModulesNames();

      if (res.success && res.data) {
        const filteredModules = res.data.filter(
          (mod) => !modules.map((m) => String(m.id)).includes(String(mod._id))
        );
        setAvailableModules(filteredModules);
      } else {
        setAvailableModules([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAvailableModule();
  }, [modules]);
  useEffect(() => {
    setModules(propModules);
  }, [propModules]);
  const handleStatusChange = (moduleId: string, newStatus: ModuleStatus) => {
    if (editingModuleId === moduleId) {
      setModuleEditData((prev) => ({ ...prev, status: newStatus }));
    } else {
      setModules((prev) =>
        prev.map((m) => (m.id === moduleId ? { ...m, status: newStatus } : m))
      );
    }
  };

  const handleDelete = async (moduleId: string) => {
    try {
      const res = await deleteBatchModule(batchId, moduleId);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      setModules((prev) => prev.filter((m) => m.id !== moduleId));
      toast.success("Module deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleEdit = (module: BatchModules) => {
    setEditingModuleId(module.id);
    setModuleEditData({
      endDate: module.endDate,
      instructor: module.instructor,
      startDate: module.startDate,
      status: module.status,
    });
  };

  const handleCancelEdit = () => {
    setEditingModuleId(null);
    setModuleEditData({});
  };

  const handleSave = async (moduleId: string) => {
    try {
      const res = await updateModuleForBatch(batchId, moduleId, moduleEditData);

      if (!res.success) {
        toast.error(res.message);
        return;
      }
      setModules((prev) =>
        prev.map((m) =>
          m.id === moduleId
            ? {
                ...m,
                ...moduleEditData,
                startDate: moduleEditData.startDate || m.startDate,
                endDate: moduleEditData.endDate || m.endDate,
                instructor: moduleEditData.instructor || m.instructor,
                status: moduleEditData.status || m.status,
              }
            : m
        )
      );

      setEditingModuleId(null);
      setModuleEditData({});
      toast.success("Module updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const updateModuleEditData = (updates: Partial<ModuleEditData>) => {
    setModuleEditData((prev) => ({ ...prev, ...updates }));
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
                onAddModules={addNewModules}
              />
            )}
          </div>
        </div>

        <FilterTabs
          filter={filter}
          statusCounts={statusCounts}
          onFilterChange={setFilter}
        />
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          {filteredModules.length > 0 ? (
            filteredModules.map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                isEditing={editingModuleId === module.id}
                moduleEditData={moduleEditData}
                onEdit={() => handleEdit(module)}
                onDelete={() => handleDelete(module.id)}
                onSave={() => handleSave(module.id)}
                onCancel={handleCancelEdit}
                onStatusChange={(status) =>
                  handleStatusChange(module.id, status)
                }
                onEditDataChange={updateModuleEditData}
                onAddInstructor={onAddInstructor}
              />
            ))
          ) : (
            <EmptyState filter={filter} />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModulesCard;
