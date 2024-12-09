import { LayoutHeader, LayoutWrapper } from "@/components/layout";
import { SongSkeleton } from "./components/song-artwork-skeleton";
import {
  BannerListContainer,
  BannerListHeader,
  BannerListWrapper,
} from "@/components/banner-list";

export default function SongsLoading() {
  return (
    <LayoutWrapper>
      <LayoutHeader
        title="Songs"
        description="Here's a list of available songs"
        actionLink="/songs/new"
        actionTitle="+ Create Song"
      />

      <BannerListContainer>
        <BannerListHeader>Latest Songs</BannerListHeader>
        <BannerListWrapper>
          {Array.from({ length: 10 }).map((_, i) => (
            <SongSkeleton key={i} />
          ))}
        </BannerListWrapper>
      </BannerListContainer>

      <BannerListContainer>
        <BannerListHeader>All Songs</BannerListHeader>
        <BannerListWrapper>
          {Array.from({ length: 10 }).map((_, i) => (
            <SongSkeleton key={i} />
          ))}
        </BannerListWrapper>
      </BannerListContainer>
    </LayoutWrapper>
  );
}
