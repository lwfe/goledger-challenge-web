import { api } from "@/lib/api";
import album, { IAlbum } from "@/models/album";

interface ISong {
  "@assetType": string;
  "@key": string;
  "@lastTouchBy": string;
  "@lastTx": string;
  "@lastUpdated": string;
  name: string;
  album: IAlbum;
}

interface ISongAsset {
  name: string;
  album: string;
}

async function filterSongs(filters: {
  filters: { [key: keyof ISong | string]: string }[];
}) {
  try {
    const results = await api.post("/query/search", {
      query: {
        selector: {
          "@assetType": "song",
          ...filters.filters,
        },
      },
    });

    for (const song of results.data.result) {
      song.album = await album.findAlbum(song.album["@key"].split(":")[1]);
    }

    return results.data.result;
  } catch (error) {
    console.error(error);
  }
}

async function createSong(song: ISongAsset) {
  try {
    const results = await api.post("/invoke/createAsset", {
      asset: [
        {
          "@assetType": "song",
          name: song.name,
          album: {
            "@key": `album:${song.album}`,
          },
        },
      ],
    });
    return results.data;
  } catch (error) {
    console.error(error);
  }
}

interface IUpdateSong {
  "@key": string;
  name: string;
  album: string;
}

async function updateSong(song: IUpdateSong) {
  try {
    const results = await api.post("/invoke/updateAsset", {
      update: {
        "@assetType": "song",
        "@key": `song:${song["@key"]}`,
        name: song.name,
        album: {
          "@key": `album:${song.album}`,
        },
      },
    });
    return results.data;
  } catch (error) {
    console.error(error);
  }
}

async function findSong(id: string) {
  try {
    const results = await api.post("/query/search", {
      query: {
        selector: {
          "@assetType": "song",
          "@key": `song:${id}`,
        },
      },
    });
    return results.data.result[0];
  } catch (error) {
    console.error(error);
  }
}

async function deleteSong(song: ISong) {
  try {
    const results = await api.post("/invoke/deleteAsset", {
      key: {
        "@assetType": "song",
        name: song.name,
        album: {
          "@key": song.album["@key"],
        },
      },
    });
    return results.data;
  } catch (error) {
    console.error(error);
  }
}

async function getSongOptions(): Promise<ISong[]> {
  try {
    const results = await api.post("/query/search", {
      query: {
        selector: {
          "@assetType": "song",
        },
      },
    });
    return results.data.result;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.response.data.error);
  }
}

export type { ISong, ISongAsset, IUpdateSong };
export default Object.freeze({
  filterSongs,
  createSong,
  updateSong,
  findSong,
  deleteSong,
  getSongOptions,
});
