"use client";
import { useAlbums } from "./hook/use-albums";
import { AlbumArtwork } from "./components/album-artwork";

import { LayoutHeader, LayoutWrapper } from "@/components/layout";
import {
  BannerListContainer,
  BannerListHeader,
  BannerListWrapper,
} from "@/components/banner-list";

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

      <BannerListContainer>
        <BannerListHeader>Latest Albums</BannerListHeader>
        <BannerListWrapper>
          {albums.map((album) => (
            <AlbumArtwork
              key={album["@key"]}
              aspectRatio="square"
              className="w-[300px]"
              album={album}
              width={300}
              height={300}
            />
          ))}
        </BannerListWrapper>
      </BannerListContainer>

      <BannerListContainer>
        <BannerListHeader>All Albums</BannerListHeader>
        <BannerListWrapper>
          {albums.map((album) => (
            <AlbumArtwork
              key={album["@key"]}
              aspectRatio="square"
              className="w-[300px]"
              album={album}
              width={300}
              height={300}
            />
          ))}
        </BannerListWrapper>
      </BannerListContainer>
    </LayoutWrapper>
  );
}
