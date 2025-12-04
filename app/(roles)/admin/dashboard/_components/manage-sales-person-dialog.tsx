"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Loader2, User } from "lucide-react";
import { toast } from "sonner";
import {
  getSalesPersons,
  deleteSalesPerson,
  updateSalesPerson,
} from "@/actions/admin/sales-person/sales-person-actions";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";

type SalesPerson = {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  joiningDate: string;
  enrolledCount: number;
};

type ManageSalesPersonsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ManageSalesPersonsDialog = ({
  open,
  onOpenChange,
}: ManageSalesPersonsDialogProps) => {
  const [salesPersons, setSalesPersons] = useState<SalesPerson[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Edit Form State
  const [editForm, setEditForm] = useState({ name: "", email: "", mobile: "" });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await getSalesPersons();
      if (res.success) {
        setSalesPersons(res.data);
      }
    } catch (error) {
        console.error(error);
      toast.error("Failed to load sales persons");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchData();
    }
  }, [open]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this sales person?")) return;
    try {
      const res = await deleteSalesPerson(id);
      if (res.success) {
        toast.success(res.message);
        fetchData(); // Refresh list
      } else {
        toast.error(res.message);
      }
    } catch (error) {
        console.log(error)
      toast.error("Error deleting sales person");
    }
  };

  const startEdit = (person: SalesPerson) => {
    setEditingId(person._id);
    setEditForm({
      name: person.name,
      email: person.email,
      mobile: person.mobile,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: "", email: "", mobile: "" });
  };

  const saveEdit = async (id: string) => {
    try {
      const res = await updateSalesPerson(id, editForm);
      if (res.success) {
        toast.success(res.message);
        setEditingId(null);
        fetchData();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
        console.log(error)
      toast.error("Failed to update");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col select-text">
        <DialogHeader>
          <DialogTitle>Manage Sales Persons</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="animate-spin text-violet-600" />
          </div>
        ) : salesPersons.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            No sales persons found.
          </div>
        ) : (
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4 py-2">
              {salesPersons.map((person) => (
                <div
                  key={person._id}
                  className="flex flex-col p-4 border rounded-lg bg-gray-50/50 gap-3"
                >
                  {editingId === person._id ? (
                    // EDIT MODE
                    <div className="space-y-3 w-full">
                      <Input
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                        placeholder="Name"
                        className="bg-white"
                      />
                      <Input
                        value={editForm.email}
                        onChange={(e) =>
                          setEditForm({ ...editForm, email: e.target.value })
                        }
                        placeholder="Email"
                        className="bg-white"
                      />
                      <Input
                        value={editForm.mobile}
                        onChange={(e) =>
                          setEditForm({ ...editForm, mobile: e.target.value })
                        }
                        placeholder="Mobile"
                        className="bg-white"
                      />
                      <div className="flex gap-2 justify-end mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          className="bg-violet-600 hover:bg-violet-700"
                          onClick={() => saveEdit(person._id)}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // VIEW MODE
                    <div className="flex justify-between items-start w-full">
                      <div className="flex gap-3">
                        <div className="bg-violet-100 p-2 rounded-full h-fit mt-1">
                          <User className="text-violet-600 h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {person.name}
                          </h3>
                          <p className="text-sm text-gray-500">{person.email}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            Joined: {format(new Date(person.joiningDate), "PP")}
                          </p>
                          <div className="mt-2 text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded w-fit font-medium">
                            {person.enrolledCount} Students Enrolled
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-500 hover:text-violet-600 hover:bg-violet-50"
                          onClick={() => startEdit(person)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleDelete(person._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ManageSalesPersonsDialog;
