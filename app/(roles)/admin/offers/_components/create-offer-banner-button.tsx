"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

import { Offer } from "@/lib/types";



const CreateOfferBannerButton = () => {
  const [form, setForm] = useState<Offer>({
    id: crypto.randomUUID(),
    title: "",
    description: "",
    discountType: "flat",
    discountValue: 0,
    validFrom: "",
    validTill: "",
    applicableCourses: [],
    isActive: true,
    image: "",
  });

  const [tab, setTab] = useState("link");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleCreate = () => {
    if (!form.title || !form.image || !form.validFrom || !form.validTill) return;
;
    setForm({
      ...form,
      id: crypto.randomUUID(),
      title: "",
      description: "",
      discountValue: 0,
      image: "",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create New Offer</Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Offer</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div>
            <Label>Discount Type</Label>
            <Select
              value={form.discountType}
              onValueChange={(val: "flat" | "percentage") =>
                setForm({ ...form, discountType: val })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flat">Flat</SelectItem>
                <SelectItem value="percentage">Percentage</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Discount Value</Label>
            <Input
              type="number"
              value={form.discountValue.toString()}
              onChange={(e) =>
                setForm({
                  ...form,
                  discountValue: parseInt(e.target.value, 10) || 0,
                })
              }
            />
          </div>
          <div>
            <Label>Valid From</Label>
            <Input
              type="date"
              value={form.validFrom}
              onChange={(e) => setForm({ ...form, validFrom: e.target.value })}
            />
          </div>
          <div>
            <Label>Valid Till</Label>
            <Input
              type="date"
              value={form.validTill}
              onChange={(e) => setForm({ ...form, validTill: e.target.value })}
            />
          </div>
          <div>
            <Label>Image</Label>
            <Tabs value={tab} onValueChange={setTab} className="mt-2">
              <TabsList>
                <TabsTrigger value="link">Image Link</TabsTrigger>
                <TabsTrigger value="upload">Upload</TabsTrigger>
              </TabsList>

              <TabsContent value="link">
                <Input
                  placeholder="https://..."
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                />
              </TabsContent>
              <TabsContent value="upload">
                <Input type="file" accept="image/*" onChange={handleImageUpload} />
              </TabsContent>
            </Tabs>

            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                className="mt-4 w-full h-48 object-cover rounded border"
              />
            )}
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button onClick={handleCreate}>Create Offer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOfferBannerButton;
