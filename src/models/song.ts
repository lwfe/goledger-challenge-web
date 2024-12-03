import { IAlbum } from "@/models/album";

interface ISong {
  "@assetType": string;
  "@key": string;
  "@lastTouchBy": string;
  "@lastTx": string;
  "@lastUpdated": string;
  name: string;
  album: IAlbum;
}

export type { ISong };
