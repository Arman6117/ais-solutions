"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DummyBatches, prCourse } from "@/lib/types/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { verifyAdminPasswordForDeletion } from "@/actions/admin/verify-admin-password-for-deletion";


const StatusCard = ({
  course,
  batches,
  name,
  createdAt,
  updatedAt,
  onRemove,
}: {
  onRemove?: () => void;
  createdAt?: string;
  updatedAt?: string;
  course?: prCourse;
  batches?: DummyBatches[];
  name: string;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConfirmDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await verifyAdminPasswordForDeletion(password);

      if (res.success) {
        if (onRemove) {
           onRemove();
        }
        setIsDialogOpen(false);
        setPassword("");
      } else {
        setError(res.message || "Invalid password");
        toast.error("Authentication failed");
      }
    } catch (err) {
      console.log("Error verifying password:", err);
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="border-0 shadow-md">
        <CardHeader className={"pb-3 bg-gray-50 border-b flex justify-between"}>
          <CardTitle className="text-xl">{name} Status</CardTitle>
        </CardHeader>
        <CardContent className="p-4 ">
          <div className={cn("space-y-4")}>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Created</span>
              <span className="font-medium">
                {format(createdAt || new Date(), "PP")}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Last Updated</span>
              <span className="font-medium">
                {format(updatedAt || new Date(), "PP")}
              </span>
            </div>
            {batches && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Status</span>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                  Published
                </Badge>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Students</span>
              <span className="font-medium">{course?.numberOfStudents}</span>
            </div>
            {batches && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Active Batches</span>
                <span className="font-medium">{batches?.length}</span>
              </div>
            )}

            <>
              <Separator className="my-2" />

              <div className="mt-4 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(true)}
                  className="w-full cursor-pointer border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove {name}
                </Button>
              </div>
            </>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the{" "}
              <span className="font-bold text-red-600">{name}</span> and remove
              all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <form onSubmit={handleConfirmDelete} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="admin-pass">Enter Admin Password to Confirm</Label>
              <Input
                id="admin-pass"
                type="password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value)
                    setError("")
                }}
                placeholder="Admin Password"
                className={error ? "border-red-500 focus-visible:ring-red-500" : ""}
                autoFocus
              />
              {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel
                disabled={isLoading}
                onClick={() => {
                  setPassword("");
                  setError("");
                }}
              >
                Cancel
              </AlertDialogCancel>
              <Button
                type="submit"
                variant="destructive"
                disabled={!password || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify & Delete"
                )}
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default StatusCard;