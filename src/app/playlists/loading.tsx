import { LayoutHeader, LayoutWrapper } from "@/components/layout";
import { SongSkeleton } from "./components/playlist-artwork-skeleton";
import {
  BannerListContainer,
  BannerListHeader,
  BannerListWrapper,
} from "@/components/banner-list";

export default function SongsLoading() {
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
          {Array.from({ length: 10 }).map((_, i) => (
            <SongSkeleton key={i} />
          ))}
        </BannerListWrapper>
      </BannerListContainer>

      <BannerListContainer>
        <BannerListHeader>All Playlists</BannerListHeader>
        <BannerListWrapper>
          {Array.from({ length: 10 }).map((_, i) => (
            <SongSkeleton key={i} />
          ))}
        </BannerListWrapper>
      </BannerListContainer>
    </LayoutWrapper>
  );
}
