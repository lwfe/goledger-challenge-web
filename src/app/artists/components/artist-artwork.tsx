"use client";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { IArtist } from "@/models/artist";

export interface Album {
  name: string;
  artist: string;
  cover: string;
}

interface ArtistArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  artist: IArtist;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export function ArtistArtwork({
  artist,
  aspectRatio = "portrait",
  width,
  height,
  className,
}: ArtistArtworkProps) {
  return (
    <Link
      href={`/artists/${artist["@key"].split(":")[1]}`}
      className={cn(
        "space-y-3 cursor-pointer hover:bg-secondary p-2 rounded-md",
        className
      )}
    >
      <div className="w-full h-auto overflow-hidden rounded-sm">
        <Image
          src={"https://picsum.photos/id/64/300"}
          alt={artist.name}
          width={width}
          height={height}
          className={cn(
            "w-auto h-auto object-cover transition-all hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
      </div>

      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{artist.name}</h3>
        <p className="text-xs text-muted-foreground">{artist.country}</p>
      </div>
    </Link>
  );
}
