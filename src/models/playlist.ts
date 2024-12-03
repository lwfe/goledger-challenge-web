import { ISong } from "./song";

interface IPlaylist {
  "@assetType": string;
  "@key": string;
  "@lastTouchBy": string;
  "@lastTx": string;
  "@lastUpdated": string;
  name: string;
  songs: ISong[];
  private: boolean;
}

export type { IPlaylist };
