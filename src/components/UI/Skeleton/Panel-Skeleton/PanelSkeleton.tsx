export const PanelSkeleton = ({ className }: { className: string }) => {
  const divs = Array.from({ length: 6 });
  return divs.map((_, id) => (
    <div key={id} className={className}>
      <div className="w-full h-full p-4 animate-pulse bg-[#00000094]">
        <div className="w-full h-full bg-[#4e4e4e91]"></div>
      </div>
    </div>
  ));
};
