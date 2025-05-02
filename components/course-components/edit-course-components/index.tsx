import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/utils";
import { Upload } from "lucide-react";
import Image from "next/image";

export function EditCourseName({
  name,
  setName,
}: {
  name: string;
  setName: (n: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-base font-medium">Course Name</Label>
      <Input
        placeholder="Enter Course Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="font-medium"
      />
    </div>
  );
}

export function EditCourseDiscount({
  discount,
  setDiscount,
}: {
  discount: number;
  setDiscount: (value: number) => void;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-base font-medium">Discount (%)</Label>
      <div className="relative">
        <Input
          type="number"
          placeholder="Enter Discount in %"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
          className="font-medium pr-8"
          min="0"
          max="100"
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          %
        </span>
      </div>
    </div>
  );
}
export function EditCoursePrice({
  price,
  setPrice,
}: {
  price: number;
  setPrice: (amount: number) => void;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-base font-medium">Regular Price</Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          ₹
        </span>
        <Input
          type="number"
          placeholder="Enter Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="font-medium pl-8"
        />
      </div>
    </div>
  );
}

export function EditCourseOfferPrice({
  price,
  discount,
  offerPrice,
}: {
  price: number;
  discount: number;
  offerPrice: number;
}) {
  return (
    <>
      <div className="space-y-2">
        <Label className="text-base font-medium">Offer Price</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            ₹
          </span>
          <Input
            type="number"
            readOnly
            placeholder="Offer Price"
            value={offerPrice}
            className="font-medium pl-8 bg-gray-50"
          />
        </div>
        {discount > 0 && (
          <p className="text-sm text-green-600">
            {discount}% off ({formatCurrency(price - offerPrice)} discount)
          </p>
        )}
      </div>
    </>
  );
}
export function EditCourseDescription({
  description,
  setDescription,
}: {
  description: string;
  setDescription: (desc: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-base font-medium">Description</Label>
      <Textarea
        placeholder="Enter Course Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="font-medium min-h-[150px]"
      />
    </div>
  );
}
export function EditCourseThumbnail({
  thumbnail,
  setThumbnail,
}: {
  thumbnail: string;
  setThumbnail: (src: string) => void;
}) {
  return (
    <>
      <Card className="overflow-hidden border-0 shadow-md">
        <CardHeader className="pb-3 bg-gray-50 border-b">
          <CardTitle className="text-xl">Course Thumbnail</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-3 p-6">
          <div className="relative w-full aspect-video overflow-hidden rounded-lg border shadow-sm">
            <Image
              src={thumbnail}
              alt="Course Thumbnail"
              fill
              className="object-cover"
            />
          </div>
          <Button className="w-full cursor-pointer flex items-center bg-primary-bg hover:bg-primary-bg/90 justify-center gap-2">
            <Upload size={16} /> Change Thumbnail
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
