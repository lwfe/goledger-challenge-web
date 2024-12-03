import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function ArtistsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4">
      <SidebarTrigger className="-ml-1" />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Artists</h1>
          <h4>Here&apos;s a list of available artists</h4>
        </div>

        <Link
          href="/artists/new"
          className={cn(buttonVariants({ variant: "default" }))}
        >
          + Create Artist
        </Link>
      </div>

      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </main>
  );
}
