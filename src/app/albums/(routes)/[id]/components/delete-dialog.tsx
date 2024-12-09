"use client";

import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { useAlbums } from "@/app/albums/hook/use-albums";
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

export function DeleteAlbumDialog({ albumId }: { albumId: string }) {
  const [open, setOpen] = useState(false);
  const { deleteAlbumMutation, findAlbumMutation } = useAlbums();

  async function deleteAlbum(id: string) {
    const album = await findAlbumMutation.mutateAsync(id);
    await deleteAlbumMutation.mutateAsync(album);
    setOpen(false);
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        <Button
          type="button"
          variant="ghost"
          className="text-destructive"
          disabled={deleteAlbumMutation.isPending}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Album
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the album
            and remove it&apos;s data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant={"destructive"}
            disabled={deleteAlbumMutation.isPending}
            onClick={() => deleteAlbum(albumId)}
          >
            {deleteAlbumMutation.isPending && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
