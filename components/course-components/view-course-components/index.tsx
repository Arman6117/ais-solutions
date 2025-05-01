import { Textarea } from "@/components/ui/textarea";

export function ViewCourseNameAndPrice({
  name,
  price,
}: {
  name: string;
  price: number;
}) {
  return (
    <>
      <div className="space-y-2">
        <div className="flex gap-2">
          {/* <div className="h-8 w-2 rounded-full bg-primary-bg"></div> */}
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold">Name</h1>
            <span className="text-xl font-semibold">{name}</span>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex gap-2 justify-cente">
          {/* <div className="h-8 w-2 rounded-full bg-primary-bg"></div> */}
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold">Price</h1>
            <span className="text-xl font-semibold">₹{price}</span>
          </div>
        </div>
      </div>
    </>
  );
}
export function ViewCourseDiscountAndOfferPrice({
  discount,
  offerPrice,
}: {
  discount: number;
  offerPrice: number;
}) {
  return (
    <>
      <div className="space-y-2 mt-0">
        <div className="flex gap-2">
          {/* <div className="h-8 w-2 rounded-full bg-primary-bg"></div> */}
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold">Discount</h1>
            <span className="text-xl font-semibold">{discount}%</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 mt-0">
        <div className="flex gap-2 justify-cente">
          {/* <div className="h-8 w-2 rounded-full bg-primary-bg"></div> */}
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold">Offer Price</h1>
            <span className="text-xl font-semibold">₹{offerPrice}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export function ViewCourseDescription({
  description,
}: {
  description: string;
}) {
  return (
    <>
      <div className="space-y-2 mt-0">
        <div className="flex gap-2">
          {/* <div className="h-8 w-10 rounded-full bg-primary-bg"></div> */}
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold">Description</h1>
            <Textarea
              readOnly
              value={description}
              className="text-xl  border-none focus-visible:border-none focus-visible:ring-0 font-semibold"
            />
            {/* {description} */}
            {/* </Textarea> */}
          </div>
        </div>
      </div>
    </>
  );
}
