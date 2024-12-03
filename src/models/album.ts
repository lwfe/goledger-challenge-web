import { IArtist } from "@/models/artist";

interface IAlbum {
  name: string;
  artist: IArtist;
  year: number;
}

export type { IAlbum };
