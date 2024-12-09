import { api } from "@/lib/api";
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

async function filterPlaylists(filters: {
  filters: { [key: keyof IPlaylist | string]: string }[];
}) {
  try {
    const results = await api.post("/query/search", {
      query: {
        selector: {
          "@assetType": "playlist",
          ...filters.filters,
        },
      },
    });
    return results.data.result;
  } catch (error) {
    console.error(error);
  }
}

interface IPlaylistAsset {
  name: string;
  private: boolean;
  songs: string[];
}

async function createPlaylist(playlist: IPlaylistAsset) {
  try {
    const results = await api.post("/invoke/createAsset", {
      asset: [
        {
          "@assetType": "playlist",
          name: playlist.name,
          private: playlist.private,
          songs: playlist.songs.map((song) => ({ "@key": song })),
        },
      ],
    });
    return results.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.response.data.error);
  }
}

interface IUpdatePlaylist {
  "@key": string;
  name: string;
  private: boolean;
  songs: string[];
}

async function updatePlaylist(playlist: IUpdatePlaylist) {
  try {
    const results = await api.post("/invoke/updateAsset", {
      update: {
        "@assetType": "playlist",
        "@key": `playlist:${playlist["@key"]}`,
        name: playlist.name,
        private: playlist.private,
        songs: playlist.songs.map((song) => ({ "@key": song })),
      },
    });
    return results.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.response.data.error);
  }
}

async function findPlaylist(id: string) {
  try {
    const results = await api.post("/query/search", {
      query: {
        selector: {
          "@assetType": "playlist",
          "@key": `playlist:${id}`,
        },
      },
    });
    return results.data.result[0];
  } catch (error) {
    console.error(error);
  }
}

async function deletePlaylist(playlist: IPlaylist) {
  try {
    const results = await api.post("/invoke/deleteAsset", {
      key: {
        "@assetType": "playlist",
        name: playlist.name,
      },
    });
    return results.data;
  } catch (error) {
    console.error(error);
  }
}

export type { IPlaylist, IPlaylistAsset, IUpdatePlaylist };
export default Object.freeze({
  filterPlaylists,
  createPlaylist,
  updatePlaylist,
  findPlaylist,
  deletePlaylist,
});
