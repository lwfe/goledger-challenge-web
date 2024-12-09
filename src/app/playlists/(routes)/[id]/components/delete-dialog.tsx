"use client";

import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlaylists } from "@/app/playlists/hook/use-playlists";
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

export function DeleteSongDialog({ playlistId }: { playlistId: string }) {
  const [open, setOpen] = useState(false);
  const { deletePlaylistMutation, findPlaylistMutation } = usePlaylists();

  async function deletePlaylist(id: string) {
    const album = await findPlaylistMutation.mutateAsync(id);
    await deletePlaylistMutation.mutateAsync(album);
    setOpen(false);
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="text-destructive"
          disabled={deletePlaylistMutation.isPending}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Playlist
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            playlist and remove it&apos;s data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant={"destructive"}
            disabled={deletePlaylistMutation.isPending}
            onClick={() => deletePlaylist(playlistId)}
          >
            {deletePlaylistMutation.isPending && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
