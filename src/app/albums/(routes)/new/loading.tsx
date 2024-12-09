import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { LayoutWrapper } from "@/components/layout";
import { buttonVariants } from "@/components/ui/button";

export default function LoadingNewAlbumPage() {
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
        <h1 className="text-2xl font-semibold">New Album</h1>
        <h4>Fill the form to create a new album</h4>
      </div>
    </LayoutWrapper>
  );
}
