import Image from "next/image";
import { cn } from "@/lib/utils";
import { IAlbum } from "@/models/album";
import Link from "next/link";

export interface Album {
  name: string;
  artist: string;
  cover: string;
}

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  album: IAlbum;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export function AlbumArtwork({
  album,
  aspectRatio = "portrait",
  width,
  height,
  className,
}: AlbumArtworkProps) {
  return (
    <Link
      href={`/albums/${album["@key"].split(":")[1]}`}
      className={cn(
        "space-y-3 cursor-pointer hover:bg-secondary p-2 rounded-md",
        className
      )}
    >
      <div className="w-full h-auto overflow-hidden rounded-sm">
        <Image
          src={"https://picsum.photos/300"}
          alt={album.name}
          width={width}
          height={height}
          className={cn(
            "w-auto h-auto object-cover transition-all hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
      </div>

      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{album.name}</h3>
        <p className="text-xs text-muted-foreground">{album.year}</p>
      </div>
    </Link>
  );
}
