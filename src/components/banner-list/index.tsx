import { ScrollArea, ScrollBar } from "../ui/scroll-area";

function BannerListContainer({ children }: { children: React.ReactNode }) {
  return <div className="py-4">{children}</div>;
}

function BannerListHeader({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl mb-3">{children}</h2>;
}

function BannerListWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ScrollArea className="w-full py-4">
      <div className="flex gap-4 overflow-x-auto">{children}</div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export { BannerListContainer, BannerListHeader, BannerListWrapper };
