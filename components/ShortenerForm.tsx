"use client"; // This ensures the component is treated as a Client Component

import { useState } from "react";

interface ShortenerFormProps {
    onAliasCreated?: () => void;
  }

export default function ShortenerForm({ onAliasCreated }: ShortenerFormProps) {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, alias }),
      });

      if (response.ok) {
        const data = await response.json();
        setShortUrl(`${window.location.origin}/${data.alias}`);
        onAliasCreated?.(); // Notify parent to refresh the list
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="url"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-2 w-full text-blue-700"
          required
        />
        <input
          type="text"
          placeholder="Enter Alias"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          className="border p-2 w-full text-blue-700"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Shorten
        </button>
      </form>
      {shortUrl && (
        <p>
          Shortened URL: <a href={shortUrl}>{shortUrl}</a>
        </p>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
