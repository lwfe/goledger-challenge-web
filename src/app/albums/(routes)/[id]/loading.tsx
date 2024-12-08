import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LayoutWrapper } from "@/components/layout";

export default function AlbumDetailsPage() {
  return (
    <LayoutWrapper>
      <Link href="/albums" className="w-fit">
        <Button variant="link" className="text-xs">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Go back to albums
        </Button>
      </Link>

      <div className="px-2">
        <h1 className="text-2xl font-semibold">Edit Album</h1>
        <h4>Fill the form to update the album</h4>
      </div>
    </LayoutWrapper>
  );
}
