"use client";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LayoutWrapper } from "@/components/layout";
import { CreateAlbumForm } from "./components/form";

export default function NewAlbumPage() {
  return (
    <LayoutWrapper>
      <Link href="/albums" className="w-fit">
        <Button variant="link" className="text-xs">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Go back to albums
        </Button>
      </Link>

      <div className="px-2">
        <h1 className="text-2xl font-semibold">New Album</h1>
        <h4>Fill the form to create a new album</h4>
      </div>

      <CreateAlbumForm />
    </LayoutWrapper>
  );
}
