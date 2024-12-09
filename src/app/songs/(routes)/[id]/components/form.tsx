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
import { useSongs } from "@/app/songs/hook/use-songs";

const formSchema = z.object({
  name: z.string({ required_error: "Required" }).min(1, "Required"),
  album: z.string({ required_error: "Required" }).min(1, "Required"),
});
type FormData = z.infer<typeof formSchema>;

interface IUpdateSongFormProps {
  songId: string;
}

export function UpdateSongForm({ songId }: IUpdateSongFormProps) {
  const { albums, updateSongMutation, findSongMutation } = useSongs();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: FormData) {
    await updateSongMutation.mutateAsync({ ...data, "@key": songId });
  }

  useEffect(() => {
    const getInitialAlbumData = async (id: string) => {
      const album = await findSongMutation.mutateAsync(id);
      if (album) {
        form.setValue("name", album.name);
        form.setValue("album", album.album["@key"].split(":")[1]);
      }
    };

    if (songId) {
      getInitialAlbumData(songId);
    }
  }, [songId]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-8 pt-6"
      >
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-20 px-2 sm:px-12">
          <span className="whitespace-nowrap text-lg font-light">
            Song details
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
              name="album"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col sm:flex-row gap-2 sm:items-center">
                  <FormLabel className="w-full font-bold text-sm">
                    Artist
                  </FormLabel>
                  <FormControl>
                    <Select
                      isDisabled
                      options={albums}
                      value={albums.find(
                        (album) =>
                          album.data["@key"].split(":")[1] ===
                          form.getValues("album")
                      )}
                      onChange={(album) => {
                        field.onChange(album?.data["@key"].split(":")[1]);
                      }}
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
          <Button disabled={updateSongMutation.isPending}>
            {updateSongMutation.isPending && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}
            Update Song
          </Button>

          <DeleteSongDialog songId={songId} />
        </div>
      </form>
    </Form>
  );
}
