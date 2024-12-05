import { LayoutHeader, LayoutWrapper } from "@/components/layout";
import { AlbumSkeleton } from "./components/album-artwork-skeleton";
import {
  BannerListContainer,
  BannerListHeader,
  BannerListWrapper,
} from "@/components/banner-list";

export default function AlbumsLoading() {
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
          {Array.from({ length: 10 }).map((_, i) => (
            <AlbumSkeleton key={i} />
          ))}
        </BannerListWrapper>
      </BannerListContainer>

      <BannerListContainer>
        <BannerListHeader>All Albums</BannerListHeader>
        <BannerListWrapper>
          {Array.from({ length: 10 }).map((_, i) => (
            <AlbumSkeleton key={i} />
          ))}
        </BannerListWrapper>
      </BannerListContainer>
    </LayoutWrapper>
  );
}
