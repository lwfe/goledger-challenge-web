import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { IOptions } from "@/models/options";
import album, { IAlbum } from "@/models/album";
import song, { ISong, ISongAsset, IUpdateSong } from "@/models/song";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";

export const useSongs = () => {
  const route = useRouter();

  const songsQuery = useSuspenseQuery<ISong[]>({
    queryKey: ["songs"],
    queryFn: async () => {
      const results = await song.filterSongs({ filters: [] });
      return results;
    },
  });

  const albumsOptionsQuery = useSuspenseQuery<IOptions<IAlbum>[]>({
    queryKey: ["artists-options"],
    queryFn: async () => {
      const results = await album.getAlbumOptions();
      return results.map((artist) => ({
        label: artist.name,
        value: artist["@key"],
        data: artist,
      }));
    },
  });

  const findSongMutation = useMutation({
    mutationFn: async (id: string) => {
      return await song.findSong(id);
    },
  });

  const createSongMutation = useMutation({
    mutationFn: async (data: ISongAsset) => {
      return await song.createSong(data);
    },
    onSuccess: async (data) => {
      toast({
        title: "Success",
        description: `Song ${data[0].name} created successfully`,
      });
      await songsQuery.refetch();
      route.push(`/songs`);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteSongMutation = useMutation({
    mutationFn: async (data: ISong) => {
      return await song.deleteSong(data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: `Album deleted successfully`,
      });
      songsQuery.refetch();
      route.push(`/songs`);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateSongMutation = useMutation({
    mutationFn: async (data: IUpdateSong) => {
      return await song.updateSong(data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: `Song updated successfully`,
      });
      route.push(`/songs`);
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
    songs: songsQuery.data,
    albums: albumsOptionsQuery.data,
    createSongMutation,
    deleteSongMutation,
    findSongMutation,
    updateSongMutation,
  };
};
