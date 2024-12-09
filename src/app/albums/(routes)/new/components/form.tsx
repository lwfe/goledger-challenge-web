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
import { useAlbums } from "@/app/albums/hook/use-albums";

const formSchema = z.object({
  name: z.string({ required_error: "Required" }).min(1, "Required"),
  artist: z.string({ required_error: "Required" }).min(1, "Required"),
  year: z.number({ required_error: "Required" }).min(1, "Required"),
});
type FormData = z.infer<typeof formSchema>;

export function CreateAlbumForm() {
  const { artists, crerateAlbumMutation } = useAlbums();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  async function onSubmit(data: FormData) {
    await crerateAlbumMutation.mutateAsync(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-8 pt-6"
      >
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-20 px-2 sm:px-12">
          <span className="whitespace-nowrap text-lg font-light">
            Album details
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
              name="artist"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col sm:flex-row gap-2 sm:items-center">
                  <FormLabel className="w-full font-bold text-sm">
                    Artist
                  </FormLabel>
                  <FormControl>
                    <Select
                      options={artists}
                      onChange={(e) =>
                        field.onChange(e?.data["@key"].split(":")[1])
                      }
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="year"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col sm:flex-row gap-2 sm:items-center">
                  <FormLabel className="w-full font-bold text-sm">
                    Year
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
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
          <Button disabled={crerateAlbumMutation.isPending}>
            {crerateAlbumMutation.isPending && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}
            Create Album
          </Button>
        </div>
      </form>
    </Form>
  );
}
