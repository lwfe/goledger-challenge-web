import { api } from "@/lib/api";
import { IArtist, IArtistAsset } from "@/models/artist";

interface IAlbum {
  "@assetType": string;
  "@key": string;
  "@lastTouchBy": string;
  "@lastTx": string;
  "@lastUpdated": string;
  name: string;
  artist: IArtist;
  year: number;
}

interface IAlbumAsset {
  name: string;
  artist: IArtistAsset;
  year: number;
}

const filterAlbums = async (filters: {
  filters: { [key: keyof IAlbum | string]: string }[];
}) => {
  try {
    const results = await api.post("/query/search", {
      query: {
        selector: {
          "@assetType": "album",
          ...filters.filters,
        },
      },
    });
    return results.data.result;
  } catch (error) {
    console.error(error);
  }
};

const createAlbum = async (album: IAlbumAsset) => {
  try {
    const results = await api.post("/invoke/createAsset", {
      asset: [
        {
          "@assetType": "album",
          name: album.name,
          year: album.year,
          artist: album.artist,
        },
      ],
    });
    return results.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

const deleteAlbum = async (album: IAlbum) => {
  try {
    const results = await api.post("/invoke/deleteAsset", {
      key: {
        "@assetType": "album",
        name: album.name,
        artist: {
          "@key": album.artist["@key"],
        },
      },
    });
    return results.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

const findAlbum = async (id: string) => {
  try {
    const results = await api.post("/query/search", {
      query: {
        selector: {
          "@assetType": "album",
          "@key": `album:${id}`,
        },
      },
    });
    return results.data.result[0];
  } catch (error) {
    throw error;
  }
};

export type { IAlbum, IAlbumAsset };
export default Object.freeze({
  filterAlbums,
  createAlbum,
  deleteAlbum,
  findAlbum,
});
