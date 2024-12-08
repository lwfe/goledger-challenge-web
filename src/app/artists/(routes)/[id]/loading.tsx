import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { LayoutWrapper } from "@/components/layout";
import { buttonVariants } from "@/components/ui/button";

export default function AlbumDetailsPage() {
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
    </LayoutWrapper>
  );
}
