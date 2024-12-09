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

async function filterArtists(filters: {
  filters: { [key: string]: string }[];
}) {
  try {
    const results = await api.post("/query/search", {
      query: {
        selector: {
          "@assetType": "artist",
          ...filters.filters,
        },
      },
    });
    return results.data.result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function findArtist(id: string): Promise<IArtist> {
  try {
    const results = await api.post("/query/search", {
      query: {
        selector: {
          "@assetType": "artist",
          "@key": `artist:${id}`,
        },
      },
    });
    return results.data.result[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

interface IUpdateArtist {
  "@key": string;
  name: string;
  country: string;
}

async function updateArtist(data: IUpdateArtist) {
  try {
    const results = await api.post("/invoke/updateAsset", {
      update: {
        "@assetType": "artist",
        "@key": `artist:${data["@key"]}`,
        name: data.name,
        country: data.country,
      },
    });
    return results.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
}

async function createArtist(data: IArtistAsset) {
  try {
    const results = await api.post("/invoke/createAsset", {
      asset: [
        {
          "@assetType": "artist",
          name: data.name,
          country: data.country,
        },
      ],
    });
    return results.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
}

async function deleteArtist(artist: IArtist) {
  try {
    const results = await api.post("/invoke/deleteAsset", {
      key: {
        "@assetType": "artist",
        name: artist.name,
      },
    });
    return results.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
}

export type { IArtist, IArtistAsset, IUpdateArtist };
export default Object.freeze({
  getArtistOptions,
  filterArtists,
  findArtist,
  updateArtist,
  createArtist,
  deleteArtist,
});
