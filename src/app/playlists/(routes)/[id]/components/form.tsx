"use client";
import { z } from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Select from "react-select";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { DeleteSongDialog } from "./delete-dialog";
import { usePlaylists } from "@/app/playlists/hook/use-playlists";

const formSchema = z.object({
  name: z.string({ required_error: "Required" }).min(1, "Required"),
  songs: z.string({ required_error: "Required" }).array(),
});
type FormData = z.infer<typeof formSchema>;

interface IUpdatePlaylistFormProps {
  playlistId: string;
}

export function UpdateSongForm({ playlistId }: IUpdatePlaylistFormProps) {
  const { songs, findPlaylistMutation, updatePlaylistMutation } =
    usePlaylists();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      songs: [],
    },
  });

  async function onSubmit(data: FormData) {
    await updatePlaylistMutation.mutateAsync({
      ...data,
      private: false,
      "@key": playlistId,
    });
  }

  useEffect(() => {
    const getInitialPlaylistData = async (id: string) => {
      const playlist = await findPlaylistMutation.mutateAsync(id);
      if (playlist) {
        form.setValue("name", playlist.name);
        form.setValue(
          "songs",
          playlist.songs.map((song: any) => song["@key"])
        );
      }
    };

    if (playlistId) {
      getInitialPlaylistData(playlistId);
    }
  }, [playlistId]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-8 pt-6"
      >
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-20 px-2 sm:px-12">
          <span className="whitespace-nowrap text-lg font-light">
            Playlist details
          </span>

          <div className="flex flex-col gap-4 w-full">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col sm:flex-row gap-2 sm:items-center">
                  <FormLabel className="w-full font-bold text-sm">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="songs"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col sm:flex-row gap-2 sm:items-center">
                  <FormLabel className="w-full font-bold text-sm">
                    Songs
                  </FormLabel>
                  <FormControl>
                    <Select
                      isMulti
                      options={songs}
                      value={songs.filter((song) =>
                        field.value.includes(song.value)
                      )}
                      onChange={(value) =>
                        form.setValue(
                          "songs",
                          value.map((song) => song.value)
                        )
                      }
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex px-2 sm:px-12">
          <Separator className="mt-2" />
        </div>

        <div className="flex flex-col sm:flex-row-reverse gap-4 px-2 sm:px-12 pb-12">
          <Button disabled={updatePlaylistMutation.isPending}>
            {updatePlaylistMutation.isPending && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}
            Update Playlist
          </Button>

          <DeleteSongDialog playlistId={playlistId} />
        </div>
      </form>
    </Form>
  );
}
