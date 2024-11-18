"use client"; // Treat this as a Client Component

import { useState, useEffect } from "react";

interface AliasProps {
  alias: string;
  url: string;
}

export default function AliasList() {
  const [aliases, setAliases] = useState<AliasProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchAliases = async () => {
    try {
      const response = await fetch("/api/aliases");
      if (response.ok) {
        const data: AliasProps[] = await response.json();
        setAliases(data);
      } else {
        setError("Failed to fetch aliases.");
      }
    } catch (err) {
      console.error("Error fetching aliases:", err);
      setError("An error occurred while fetching aliases.");
    }
  };

  useEffect(() => {
    fetchAliases();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold mb-2">All Aliases</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-2">
        {aliases.map((alias) => (
          <li key={alias.alias} className="border p-2">
            <strong>{alias.alias}</strong> → <a href={alias.url}>{alias.url}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
