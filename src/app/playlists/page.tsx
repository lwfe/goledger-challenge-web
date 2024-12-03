import { LayoutHeader, LayoutWrapper } from "@/components/layout";

export default function PlaylistsPage() {
  return (
    <LayoutWrapper>
      <LayoutHeader
        title="Playlists"
        description="Here's a list of available playlists"
        actionLink="/playlists/new"
        actionTitle="+ Create Playlist"
      />

      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </LayoutWrapper>
  );
}
