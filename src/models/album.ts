import { api } from "@/lib/api";
import { IArtist } from "@/models/artist";

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
  artist: string;
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
          artist: {
            "@key": `artist:${album.artist}`,
          },
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

const findAlbum = async (id: string): Promise<IAlbum> => {
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

interface IUpdateAlbum {
  "@key": string;
  name: string;
  year: number;
  artist: string;
}

const updateAlbum = async (data: IUpdateAlbum) => {
  try {
    const results = await api.post("/invoke/updateAsset", {
      update: {
        "@assetType": "album",
        "@key": `album:${data["@key"]}`,
        name: data.name,
        year: data.year,
        artist: {
          "@key": `album:${data.artist}`,
        },
      },
    });
    return results.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export type { IAlbum, IAlbumAsset, IUpdateAlbum };
export default Object.freeze({
  filterAlbums,
  createAlbum,
  deleteAlbum,
  findAlbum,
  updateAlbum,
});
