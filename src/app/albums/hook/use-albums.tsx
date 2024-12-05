import album, { IAlbum } from "@/models/album";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useAlbums = () => {
  const { data: albums } = useSuspenseQuery<IAlbum[]>({
    queryKey: ["albums"],
    queryFn: async () => {
      const results = await album.filterAlbums({ filters: [] });
      return results;
    },
  });

  return { albums };
};
