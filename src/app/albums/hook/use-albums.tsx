"use client";

import { useEffect, useState } from "react";
import { filterAlbums, IAlbum } from "@/models/album";

const useAlbums = () => {
  const [albums, setAlbums] = useState<IAlbum[]>([]);

  const fetchAlbums = async () => {
    const results = await filterAlbums({ filters: [] });
    setAlbums(results);
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return { albums };
};

export { useAlbums };
