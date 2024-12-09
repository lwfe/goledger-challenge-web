"use client";

import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import artist, { IArtist, IArtistAsset, IUpdateArtist } from "@/models/artist";

export const useArtists = () => {
  const route = useRouter();

  const artistsQuery = useSuspenseQuery<IArtist[]>({
    queryKey: ["artists"],
    queryFn: async () => {
      const results = await artist.filterArtists({ filters: [] });
      return results;
    },
  });

  const findArtistMutation = useMutation({
    mutationFn: async (id: string) => {
      return await artist.findArtist(id);
    },
  });

  const createArtistMutation = useMutation({
    mutationFn: async (data: IArtistAsset) => {
      return await artist.createArtist(data);
    },
    onSuccess: async (data) => {
      toast({
        title: "Success",
        description: `Artist ${data[0].name} created successfully`,
      });
      await artistsQuery.refetch();
      route.push(`/artists`);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteArtistMutation = useMutation({
    mutationFn: async (data: IArtist) => {
      return await artist.deleteArtist(data);
    },
    onSuccess: async () => {
      toast({
        title: "Success",
        description: `Artist deleted successfully`,
      });
      await artistsQuery.refetch();
      route.push(`/artists`);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateArtistMutation = useMutation({
    mutationFn: async (data: IUpdateArtist) => {
      return await artist.updateArtist(data);
    },
    onSuccess: async () => {
      toast({
        title: "Success",
        description: `Artist updated successfully`,
      });
      await artistsQuery.refetch();
      route.push(`/artists`);
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
    artists: artistsQuery.data,
    createArtistMutation,
    deleteArtistMutation,
    findArtistMutation,
    updateArtistMutation,
  };
};
