import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { LayoutWrapper } from "@/components/layout";

export default function LoadingNewArtistPage() {
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
        <h1 className="text-2xl font-semibold">New Artist</h1>
        <h4>Fill the form to create a new artist</h4>
      </div>
    </LayoutWrapper>
  );
}
