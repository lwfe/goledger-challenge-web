import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { LayoutWrapper } from "@/components/layout";
import { UpdateSongForm } from "./components/form";
import { buttonVariants } from "@/components/ui/button";

export default function PlaylistDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <LayoutWrapper>
      <Link
        href="/playlists"
        className={cn(buttonVariants({ variant: "link" }), "w-fit text-xs")}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Go back to playlist
      </Link>

      <div className="px-2">
        <h1 className="text-2xl font-semibold">Edit Playlist</h1>
        <h4>Fill the form to update the playlist</h4>
      </div>

      <UpdateSongForm playlistId={params.id} />
    </LayoutWrapper>
  );
}
