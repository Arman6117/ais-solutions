"use client";
import React, { useMemo, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox"; // Add a Checkbox component from Shadcn UI

import { DummyModules } from "@/lib/types";
import { dummyModules } from "@/lib/static";

type AddModuleButtonProps = {
  setModules?: (modules: DummyModules[]) => void;
};

const AddModuleButton = ({ setModules }: AddModuleButtonProps) => {
  const [search, setSearch] = useState("");
  const [selectedModules, setSelectedModules] = useState<DummyModules[]>([]);

  const filteredModules = useMemo(() => {
    return dummyModules.filter((module) =>
      module.name.toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [search]);

  const toggleModule = (module: DummyModules) => {
    const exists = selectedModules.some((m) => m.id === module.id);
    if (exists) {
      setSelectedModules((prev) => prev.filter((m) => m.id !== module.id));
    } else {
      setSelectedModules((prev) => [...prev, module]);
    }
  };

  const handleAddModules = () => {
    if (setModules) {
      setModules(selectedModules);
    }
  };

  const isSelected = (module: DummyModules) =>
    selectedModules.some((m) => m.id === module.id);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary-bg">Add Modules</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select modules to add</DialogTitle>
        </DialogHeader>

        <Input
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search modules by name..."
          className="w-full my-2 border-black focus-visible:ring-0 focus-visible:border-2 focus-visible:border-primary-bg"
        />

        <div className="flex flex-col gap-3 mt-2">
          {filteredModules.map((module) => (
            <label
              key={module.id}
              className="flex items-center gap-3 cursor-pointer p-2 border rounded-md hover:bg-muted transition"
            >
              <Checkbox
                checked={isSelected(module)}
                onCheckedChange={() => toggleModule(module)}
              />
              <span className="text-sm font-medium">{module.name}</span>
            </label>
          ))}
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button
              className="bg-primary-bg cursor-pointer"
              onClick={handleAddModules}
              disabled={selectedModules.length === 0}
            >
              Add Selected ({selectedModules.length})
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddModuleButton;
