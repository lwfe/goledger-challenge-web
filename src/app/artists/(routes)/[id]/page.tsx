import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { LayoutWrapper } from "@/components/layout";
import { UpdateArtistForm } from "./components/form";
import { cn } from "@/lib/utils";

export default function ArtistDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <LayoutWrapper>
      <Link
        href="/artists"
        className={cn(buttonVariants({ variant: "link" }), "w-fit text-xs")}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Go back to artists
      </Link>

      <div className="px-2">
        <h1 className="text-2xl font-semibold">Edit Artist</h1>
        <h4>Fill the form to update the artist</h4>
      </div>

      <UpdateArtistForm artistId={params.id} />
    </LayoutWrapper>
  );
}
