export const TrackListSkeleton = () => {
  const divs = Array.from({ length: 5 });
  return divs.map((_, id) => (
    <section
      key={id}
      className="w-full mb-2 ml-[18px] flex justify-between items-center"
    >
      <section className="lg:w-[150px] sm:w-[150px] md:w-[200px] flex items-center w-[100px]">
        <div className="animate-pulse min-w-[40px] h-[40px] ml-[2px]">
          <div className=" w-full h-full  bg-[#4e4e4e] "></div>
        </div>

        <div className="space-y-3 w-[300px]   pl-2 animate-pulse">
          <div className="h-2  bg-[#4e4e4e]  rounded"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-2  bg-[#4e4e4e] rounded col-span-2"></div>
          </div>
        </div>
      </section>
      <section className="lg:w-[150px] w-[100px] hidden lg:flex items-center ">
        <div className="space-y-3 w-[300px]  pl-10 animate-pulse">
          <div className="h-2  bg-[#4e4e4e]  rounded"></div>
        </div>
      </section>
      <section className="w-[100px] flex  mr-[18px] items-center">
        <div className="space-y-3 w-full  pl-10 animate-pulse">
          <div className="h-2  bg-[#4e4e4e]  rounded"></div>
        </div>
      </section>
    </section>
  ));
};
