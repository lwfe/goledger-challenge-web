import { LayoutHeader, LayoutWrapper } from "@/components/layout";

export default function AlbumsPage() {
  return (
    <LayoutWrapper>
      <LayoutHeader
        title="Albums"
        description="Here's a list of available albums"
        actionLink="/albums/new"
        actionTitle="+ Create Album"
      />

      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </LayoutWrapper>
  );
}
