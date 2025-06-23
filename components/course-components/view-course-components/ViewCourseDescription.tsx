
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
            <h1 className="text-2xl font-bold text-neutral-800">Description</h1>
            <p

              className="md:text-xl  border-none focus-visible:border-none focus-visible:ring-0 font-semibold" />
            {description}
            {/* </Textarea> */}
          </div>
        </div>
      </div>
    </>
  );
}
