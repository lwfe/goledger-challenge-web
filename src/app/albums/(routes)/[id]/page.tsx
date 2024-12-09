import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { UpdateAlbumForm } from "./components/form";
import { LayoutWrapper } from "@/components/layout";
import { buttonVariants } from "@/components/ui/button";

export default function AlbumDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <LayoutWrapper>
      <Link
        href="/albums"
        className={cn(buttonVariants({ variant: "link" }), "w-fit text-xs")}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Go back to albums
      </Link>

      <div className="px-2">
        <h1 className="text-2xl font-semibold">Edit Album</h1>
        <h4>Fill the form to update the album</h4>
      </div>

      <UpdateAlbumForm albumId={params.id} />
    </LayoutWrapper>
  );
}
