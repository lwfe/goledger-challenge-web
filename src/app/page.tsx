import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Page() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4">
      <SidebarTrigger className="-ml-1" />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Playlists</h1>
          <h4>Here&apos;s a list of available playlists</h4>
        </div>

        <Link
          href="/playlists/new"
          className={cn(buttonVariants({ variant: "default" }))}
        >
          + Create Playlist
        </Link>
      </div>

      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </main>
  );
}
