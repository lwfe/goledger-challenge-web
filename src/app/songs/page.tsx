"use client";
import { useSongs } from "./hook/use-songs";
import { SongArtwork } from "./components/song-artwork";

import { LayoutHeader, LayoutWrapper } from "@/components/layout";
import {
  BannerListContainer,
  BannerListHeader,
  BannerListWrapper,
} from "@/components/banner-list";

export default function SongsPage() {
  const { songs } = useSongs();

  return (
    <LayoutWrapper>
      <LayoutHeader
        title="Songs"
        description="Here's a list of available songs"
        actionLink="/songs/new"
        actionTitle="+ Create Song"
      />

      <BannerListContainer>
        <BannerListHeader>Latest songs</BannerListHeader>
        <BannerListWrapper>
          {songs.map((song) => (
            <SongArtwork
              key={song["@key"]}
              aspectRatio="square"
              className="w-[300px]"
              song={song}
              width={300}
              height={300}
            />
          ))}
        </BannerListWrapper>
      </BannerListContainer>

      <BannerListContainer>
        <BannerListHeader>All Songs</BannerListHeader>
        <BannerListWrapper>
          {songs.map((song) => (
            <SongArtwork
              key={song["@key"]}
              aspectRatio="square"
              className="w-[300px]"
              song={song}
              width={300}
              height={300}
            />
          ))}
        </BannerListWrapper>
      </BannerListContainer>
    </LayoutWrapper>
  );
}
