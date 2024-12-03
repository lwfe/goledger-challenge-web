import { IAlbum } from "@/models/album";

interface ISong {
  name: string;
  album: IAlbum;
}

export type { ISong };
