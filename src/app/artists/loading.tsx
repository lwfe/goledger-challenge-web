import { LayoutHeader, LayoutWrapper } from "@/components/layout";
import { ArtistSkeleton } from "./components/artist-artwork-skeleton";
import {
  BannerListContainer,
  BannerListHeader,
  BannerListWrapper,
} from "@/components/banner-list";

export default function ArtistsLoading() {
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
          {Array.from({ length: 10 }).map((_, i) => (
            <ArtistSkeleton key={i} />
          ))}
        </BannerListWrapper>
      </BannerListContainer>

      <BannerListContainer>
        <BannerListHeader>All Artists</BannerListHeader>
        <BannerListWrapper>
          {Array.from({ length: 10 }).map((_, i) => (
            <ArtistSkeleton key={i} />
          ))}
        </BannerListWrapper>
      </BannerListContainer>
    </LayoutWrapper>
  );
}
