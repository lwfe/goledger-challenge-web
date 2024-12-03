import { LayoutHeader, LayoutWrapper } from "@/components/layout";

export default function ArtistsPage() {
  return (
    <LayoutWrapper>
      <LayoutHeader
        title="Artists"
        description="Here's a list of available artists"
        actionLink="/artists/new"
        actionTitle="+ Create Artist"
      />

      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </LayoutWrapper>
  );
}
