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
  const [copied, setCopied] = useState(false);

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCopied(false); // Reset copied state

    if (!isValidUrl(url)) {
      setError("Please enter a valid URL.");
      return;
    }

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
    } catch {
      setError("Something went wrong.");
    }
  };

  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      setCopied(true); // Show feedback to the user
      setTimeout(() => setCopied(false), 2000); // Reset feedback after 2 seconds
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
        <div className="mt-4">
          <p>
            Shortened URL:{" "}
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
              {shortUrl}
            </a>
          </p>
          <button
            onClick={handleCopy}
            className="bg-green-500 text-white p-2 mt-2"
          >
            {copied ? "Copied!" : "Copy URL"}
          </button>
        </div>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
