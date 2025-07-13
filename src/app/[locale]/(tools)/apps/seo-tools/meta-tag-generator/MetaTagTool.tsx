"use client";

import { useState } from "react";
import { Copy } from "lucide-react";

export default function MetaTagTool() {
  const [title, setTitle] = useState("Contoh Judul Halaman");
  const [description, setDescription] = useState(
    "Ini adalah deskripsi SEO yang akan muncul di hasil pencarian dan preview media sosial."
  );
  const [canonical, setCanonical] = useState("https://contoh.com");
  const [ogImage, setOgImage] = useState("https://contoh.com/og-image.jpg");
  const [twitterCard, setTwitterCard] = useState("summary_large_image");
  const [copied, setCopied] = useState(false);

  const metaTags = `
<title>${title}</title>
<meta name="description" content="${description}" />
<link rel="canonical" href="${canonical}" />

<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:url" content="${canonical}" />
<meta property="og:image" content="${ogImage}" />

<meta name="twitter:card" content="${twitterCard}" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${ogImage}" />
`.trim();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(metaTags);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        Meta Tag & Open Graph Generator
      </h1>

      {/* Form Input */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-md p-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-md p-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Canonical URL</label>
          <input
            type="url"
            value={canonical}
            onChange={(e) => setCanonical(e.target.value)}
            className="w-full border rounded-md p-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">OG Image URL</label>
          <input
            type="url"
            value={ogImage}
            onChange={(e) => setOgImage(e.target.value)}
            className="w-full border rounded-md p-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Twitter Card Type</label>
          <select
            value={twitterCard}
            onChange={(e) => setTwitterCard(e.target.value)}
            className="w-full border rounded-md p-2 text-sm"
          >
            <option value="summary">summary</option>
            <option value="summary_large_image">summary_large_image</option>
            <option value="app">app</option>
            <option value="player">player</option>
          </select>
        </div>
      </div>

      {/* Output */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Generated Meta Tags
        </label>
        <div className="relative">
          <pre className="bg-gray-100 text-sm p-4 rounded-md overflow-auto whitespace-pre-wrap">
            {metaTags}
          </pre>
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 bg-white border p-1 rounded hover:bg-gray-200"
            title="Copy to clipboard"
          >
            <Copy size={16} />
          </button>
          {copied && (
            <p className="text-green-600 text-xs mt-2">
              Meta tag berhasil disalin!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
