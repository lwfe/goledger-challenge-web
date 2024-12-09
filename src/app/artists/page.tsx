"use client";
import { useArtists } from "./hook/use-artists";
import { ArtistArtwork } from "./components/artist-artwork";
import { LayoutHeader, LayoutWrapper } from "@/components/layout";
import {
  BannerListContainer,
  BannerListHeader,
  BannerListWrapper,
} from "@/components/banner-list";

export default function ArtistsPage() {
  const { artists } = useArtists();

  return (
    <LayoutWrapper>
      <LayoutHeader
        title="Artists"
        description="Here's a list of available artists"
        actionLink="/artists/new"
        actionTitle="+ Create Artist"
      />

      <BannerListContainer>
        <BannerListHeader>Trending Artists</BannerListHeader>
        <BannerListWrapper>
          {artists.map((artist) => (
            <ArtistArtwork
              key={artist["@key"]}
              aspectRatio="square"
              className="w-[300px]"
              artist={artist}
              width={300}
              height={300}
            />
          ))}
        </BannerListWrapper>
      </BannerListContainer>

      <BannerListContainer>
        <BannerListHeader>All Artists</BannerListHeader>
        <BannerListWrapper>
          {artists.map((album) => (
            <ArtistArtwork
              key={album["@key"]}
              aspectRatio="square"
              className="w-[300px]"
              artist={album}
              width={300}
              height={300}
            />
          ))}
        </BannerListWrapper>
      </BannerListContainer>
    </LayoutWrapper>
  );
}
