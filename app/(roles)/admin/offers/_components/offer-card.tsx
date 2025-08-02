"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Pencil,
  Tag,
  Trash,
  UploadCloud,
  Image as ImageIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import EditOfferDialog from "./edit-offer-dialog";
import { Offer } from "@/lib/types/types";


type OfferCardProps = {
  offer: Offer;
 
};

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const isExpiringSoon = (validTill: string) => {
  const today = new Date();
  const expiryDate = new Date(validTill);
  const diff = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
  return diff <= 7 && diff > 0;
};

const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
  const discountText =
    offer.discountType === "percentage"
      ? `${offer.discountValue}% OFF`
      : `₹${offer.discountValue} OFF`;

  const isExpiring = isExpiringSoon(offer.validTill);

  return (
    <div className={`group relative overflow-hidden rounded-xl bg-white shadow-lg border ${!offer.isActive ? "opacity-60" : ""}`}>
      <div className="relative h-48 overflow-hidden">
        <img
          src={offer.image}
          alt={offer.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <Badge className="bg-yellow-400 text-black font-bold text-xs px-3 py-1 shadow">
            {discountText}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 flex gap-2">
          {isExpiring && offer.isActive && (
            <Badge className="bg-red-600 text-white animate-pulse flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Soon
            </Badge>
          )}
          {!offer.isActive && (
            <Badge className="bg-gray-700 text-white">Inactive</Badge>
          )}
        </div>
        <h3 className="absolute bottom-2 left-4 text-xl font-bold text-white drop-shadow-lg">
          {offer.title}
        </h3>
      </div>

      <div className="p-5 space-y-3">
        <p className="text-gray-700">{offer.description}</p>

        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-blue-500" />
          <p className="text-sm font-medium text-gray-900">
            Applicable Courses:
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {offer.applicableCourses.map((course:string) => (
            <Badge
              key={course}
              variant="outline"
              className="border-blue-300 text-blue-600 text-xs"
            >
              {course}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-md text-sm">
          <Calendar className="w-4 h-4 text-green-500" />
          Valid: {formatDate(offer.validFrom)} – {formatDate(offer.validTill)}
        </div>

        <div className="flex justify-between pt-3 border-t">
          <EditOfferDialog offer={offer} onSave={()=>{}}>
            <Button variant="secondary" size="sm">
              <Pencil className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </EditOfferDialog>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {}}
          >
            <Trash className="w-4 h-4 mr-1" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
