"use client";

import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useArtists } from "@/app/artists/hook/use-artists";

export function DeleteArtistDialog({ artistId }: { artistId: string }) {
  const [open, setOpen] = useState(false);
  const { deleteArtistMutation, findArtistMutation } = useArtists();

  async function deleteArtist(id: string) {
    const artist = await findArtistMutation.mutateAsync(id);
    await deleteArtistMutation.mutateAsync(artist);
    setOpen(false);
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="text-destructive"
          disabled={deleteArtistMutation.isPending}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Artist
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            artist and remove it&apos;s data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant={"destructive"}
            disabled={deleteArtistMutation.isPending}
            onClick={() => deleteArtist(artistId)}
          >
            {deleteArtistMutation.isPending && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
