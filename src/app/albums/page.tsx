"use client";
import { useAlbums } from "./hook/use-albums";
import { LayoutHeader, LayoutWrapper } from "@/components/layout";

export default function AlbumsPage() {
  const { albums } = useAlbums();

  return (
    <LayoutWrapper>
      <LayoutHeader
        title="Albums"
        description="Here's a list of available albums"
        actionLink="/albums/new"
        actionTitle="+ Create Album"
      />

      {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
      {albums?.map((album) => (
        <div key={album.name}>
          <p>{album.name}</p>
          <p>{album["@lastUpdated"]}</p>
        </div>
      ))}
    </LayoutWrapper>
  );
}
