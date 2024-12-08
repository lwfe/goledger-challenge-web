"use client";
import { usePlaylists } from "./hook/use-playlists";
import { PlaylistArtwork } from "./components/playlist-artwork";

import { LayoutHeader, LayoutWrapper } from "@/components/layout";
import {
  BannerListContainer,
  BannerListHeader,
  BannerListWrapper,
} from "@/components/banner-list";

export default function PlaylistsPage() {
  const { playlists } = usePlaylists();

  return (
    <LayoutWrapper>
      <LayoutHeader
        title="Playlists"
        description="Here's a list of available playlists"
        actionLink="/playlists/new"
        actionTitle="+ Create Playlist"
      />

      <BannerListContainer>
        <BannerListHeader>Latest Playlists</BannerListHeader>
        <BannerListWrapper>
          {playlists.map((playlist) => (
            <PlaylistArtwork
              key={playlist["@key"]}
              aspectRatio="square"
              className="w-[300px]"
              playlist={playlist}
              width={300}
              height={300}
            />
          ))}
        </BannerListWrapper>
      </BannerListContainer>

      <BannerListContainer>
        <BannerListHeader>All Playlists</BannerListHeader>
        <BannerListWrapper>
          {playlists.map((playlist) => (
            <PlaylistArtwork
              key={playlist["@key"]}
              aspectRatio="square"
              className="w-[300px]"
              playlist={playlist}
              width={300}
              height={300}
            />
          ))}
        </BannerListWrapper>
      </BannerListContainer>
    </LayoutWrapper>
  );
}
