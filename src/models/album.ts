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

export type { IAlbum };
export default Object.freeze({ filterAlbums });
