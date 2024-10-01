export const ButtonSkeleton = ({
  className,
  arrayLength,
}: {
  className: string;
  arrayLength: number;
}) => {
  const divs = Array.from({ length: arrayLength });
  return divs.map((_, index) => (
    <div key={index} className={className}>
      <div className="animate-pulse min-w-[40px] h-[40px] ml-[2px]">
        <div className=" w-full h-full  bg-[#4e4e4e] "></div>
      </div>

      <div className="space-y-3 w-full  pl-2 animate-pulse">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2  bg-[#4e4e4e] rounded col-span-2"></div>
        </div>
        <div className="h-2  bg-[#4e4e4e]  rounded"></div>
      </div>
    </div>
  ));
};
