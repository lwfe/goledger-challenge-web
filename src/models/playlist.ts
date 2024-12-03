import { ISong } from "./song";

interface IPlaylist {
  name: string;
  songs: ISong[];
  private: boolean;
}

export type { IPlaylist };
