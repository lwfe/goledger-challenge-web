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
import { Loader2 } from "lucide-react";

import { usePlaylists } from "@/app/playlists/hook/use-playlists";

const formSchema = z.object({
  name: z.string({ required_error: "Required" }).min(1, "Required"),
  songs: z.string({ required_error: "Required" }).array(),
});
type FormData = z.infer<typeof formSchema>;

export function CreateSongForm() {
  const { songs, createPlaylistMutation } = usePlaylists();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      songs: [],
    },
  });

  async function onSubmit(data: FormData) {
    await createPlaylistMutation.mutateAsync({ ...data, private: false });
  }

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
                    <Input {...field} />
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
                      onChange={(option) =>
                        field.onChange(option.map((song) => song.value))
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

        <div className="flex flex-col sm:flex-row-reverse gap-4 sm:gap-20 px-2 sm:px-12 pb-12">
          <Button disabled={createPlaylistMutation.isPending}>
            {createPlaylistMutation.isPending && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}
            Create Playlist
          </Button>
        </div>
      </form>
    </Form>
  );
}
