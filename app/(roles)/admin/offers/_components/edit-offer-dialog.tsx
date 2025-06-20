"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

import { Offer } from "@/lib/types";

type Props = {
  offer: Offer;
  onSave: (updated: Offer) => void;
  children: React.ReactNode;
};

const EditOfferDialog = ({ offer, onSave, children }: Props) => {
  const [edited, setEdited] = useState<Offer>({ ...offer });
  const [tab, setTab] = useState(offer.image.startsWith("http") ? "link" : "upload");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setEdited({ ...edited, image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    onSave(edited);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Offer</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <Label>Title</Label>
            <Input
              value={edited.title ?? ""}
              onChange={(e) => setEdited({ ...edited, title: e.target.value })}
            />
          </div>

          {/* Description */}
          <div>
            <Label>Description</Label>
            <Textarea
              value={edited.description ?? ""}
              onChange={(e) => setEdited({ ...edited, description: e.target.value })}
            />
          </div>

          {/* Discount Type */}
          <div>
            <Label>Discount Type</Label>
            <Select
              value={edited.discountType}
              onValueChange={(val: "flat" | "percentage") =>
                setEdited({ ...edited, discountType: val })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select discount type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flat">Flat</SelectItem>
                <SelectItem value="percentage">Percentage</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Discount Value */}
          <div>
            <Label>Discount Value</Label>
            <Input
              type="number"
              value={edited.discountValue.toString()}
              onChange={(e) =>
                setEdited({
                  ...edited,
                  discountValue: parseInt(e.target.value, 10) || 0,
                })
              }
            />
          </div>

          {/* Valid From */}
          <div>
            <Label>Valid From</Label>
            <Input
              type="date"
              value={edited.validFrom ?? ""}
              onChange={(e) =>
                setEdited({ ...edited, validFrom: e.target.value })
              }
            />
          </div>

          {/* Valid Till */}
          <div>
            <Label>Valid Till</Label>
            <Input
              type="date"
              value={edited.validTill ?? ""}
              onChange={(e) =>
                setEdited({ ...edited, validTill: e.target.value })
              }
            />
          </div>

          {/* Image (Link or Upload via Tabs) */}
          <div>
            <Label>Offer Image</Label>
            <Tabs defaultValue={tab} value={tab} onValueChange={setTab} className="w-full mt-2">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="link">Image Link</TabsTrigger>
                <TabsTrigger value="upload">Upload File</TabsTrigger>
              </TabsList>

              <TabsContent value="link">
                <Input
                  placeholder="https://..."
                  value={edited.image}
                  onChange={(e) => setEdited({ ...edited, image: e.target.value })}
                />
              </TabsContent>

              <TabsContent value="upload">
                <Input type="file" accept="image/*" onChange={handleImageUpload} />
              </TabsContent>
            </Tabs>

            {edited.image && (
              <img
                src={edited.image}
                alt="Offer preview"
                className="mt-4 w-full h-48 object-cover rounded-lg border shadow"
              />
            )}
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditOfferDialog;
