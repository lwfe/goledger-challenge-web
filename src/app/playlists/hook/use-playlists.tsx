import playlist, {
  IPlaylist,
  IPlaylistAsset,
  IUpdatePlaylist,
} from "@/models/playlist";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { IOptions } from "@/models/options";
import song, { ISong } from "@/models/song";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";

export const usePlaylists = () => {
  const route = useRouter();

  const playlistsQuery = useSuspenseQuery<IPlaylist[]>({
    queryKey: ["playlists"],
    queryFn: async () => {
      const results = await playlist.filterPlaylists({ filters: [] });
      return results;
    },
  });

  const songsOptionsQuery = useSuspenseQuery<IOptions<ISong>[]>({
    queryKey: ["songs-options"],
    queryFn: async () => {
      const results = await song.getSongOptions();
      return results.map((playlist) => ({
        label: playlist.name,
        value: playlist["@key"],
        data: playlist,
      }));
    },
  });

  const findPlaylistMutation = useMutation({
    mutationFn: async (id: string) => {
      return await playlist.findPlaylist(id);
    },
  });

  const createPlaylistMutation = useMutation({
    mutationFn: async (data: IPlaylistAsset) => {
      return await playlist.createPlaylist(data);
    },
    onSuccess: async (data) => {
      toast({
        title: "Success",
        description: `Playlist ${data[0].name} created successfully`,
      });
      await playlistsQuery.refetch();
      route.push(`/playlists`);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deletePlaylistMutation = useMutation({
    mutationFn: async (data: IPlaylist) => {
      return await playlist.deletePlaylist(data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: `Playlist deleted successfully`,
      });
      playlistsQuery.refetch();
      route.push(`/playlists`);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updatePlaylistMutation = useMutation({
    mutationFn: async (data: IUpdatePlaylist) => {
      return await playlist.updatePlaylist(data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: `Song updated successfully`,
      });
      route.push(`/playlists`);
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
    playlists: playlistsQuery.data,
    songs: songsOptionsQuery.data,
    createPlaylistMutation,
    deletePlaylistMutation,
    findPlaylistMutation,
    updatePlaylistMutation,
  };
};
