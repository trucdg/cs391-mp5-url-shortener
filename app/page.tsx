"use client";

import { useState } from "react";
import ShortenerForm from "@/components/ShortenerForm";
import AliasList from "@/components/AliasList";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshAliases = () => {
    setRefreshKey((prev) => prev + 1); // Increment the refresh key to re-render AliasList
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">URL Shortener</h1>
      <ShortenerForm onAliasCreated={refreshAliases} />
      <AliasList key={refreshKey} />
    </div>
  );
}
