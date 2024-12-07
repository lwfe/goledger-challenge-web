import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { IOptions } from "@/models/options";
import artist, { IArtist } from "@/models/artist";
import album, { IAlbum, IAlbumAsset } from "@/models/album";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";

export const useAlbums = () => {
  const route = useRouter();

  const albumsQuery = useSuspenseQuery<IAlbum[]>({
    queryKey: ["albums"],
    queryFn: async () => {
      const results = await album.filterAlbums({ filters: [] });
      return results;
    },
  });

  const artistsQuery = useSuspenseQuery<IOptions<IArtist>[]>({
    queryKey: ["artists"],
    queryFn: async () => {
      const results = await artist.getArtistOptions();
      return results.map((artist) => ({
        label: artist.name,
        value: artist["@key"],
        data: artist,
      }));
    },
  });

  const crerateAlbumMutation = useMutation({
    mutationFn: async (data: IAlbumAsset) => {
      return await album.createAlbum(data);
    },
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: `Album ${data[0].name} created successfully`,
      });
      albumsQuery.refetch();
      route.push(`/albums`);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteAlbumMutation = useMutation({
    mutationFn: async (data: IAlbum) => {
      return await album.deleteAlbum(data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: `Album deleted successfully`,
      });
      albumsQuery.refetch();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    albums: albumsQuery.data,
    artists: artistsQuery.data,
    crerateAlbumMutation,
    deleteAlbumMutation,
  };
};
