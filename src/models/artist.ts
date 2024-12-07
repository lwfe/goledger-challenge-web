import { api } from "@/lib/api";

interface IArtist {
  "@assetType": string;
  "@key": string;
  "@lastTouchBy": string;
  "@lastTx": string;
  "@lastUpdated": string;
  name: string;
  country: string;
}

interface IArtistAsset {
  name: string;
  country: string;
}

async function getArtistOptions(): Promise<IArtist[]> {
  try {
    const results = await api.post("/query/search", {
      query: {
        selector: {
          "@assetType": "artist",
        },
      },
    });
    return results.data.result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export type { IArtist, IArtistAsset };
export default Object.freeze({ getArtistOptions });
