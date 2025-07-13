"use client";

import { useState } from "react";
import { Copy } from "lucide-react";

export default function SitemapTool() {
  const [urls, setUrls] = useState(["https://example.com/"]);
  const [lastmod, setLastmod] = useState("");
  const [changefreq, setChangefreq] = useState("monthly");
  const [priority, setPriority] = useState("0.8");
  const [copied, setCopied] = useState(false);

  const handleUrlChange = (i: number, val: string) => {
    const newUrls = [...urls];
    newUrls[i] = val;
    setUrls(newUrls);
  };

  const handleAddUrl = () => {
    setUrls([...urls, ""]);
  };

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .filter((url) => url.trim() !== "")
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`.trim();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(sitemapXml);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Sitemap.xml Generator</h1>

      {/* Form Input */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Daftar URL</label>
          {urls.map((url, i) => (
            <input
              key={i}
              type="url"
              value={url}
              onChange={(e) => handleUrlChange(i, e.target.value)}
              className="w-full border rounded-md p-2 text-sm mb-2"
              placeholder={`https://example.com/page-${i + 1}`}
            />
          ))}
          <button
            onClick={handleAddUrl}
            className="text-blue-600 text-sm hover:underline"
          >
            + Tambah URL
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium">
            Last Modified (opsional)
          </label>
          <input
            type="date"
            value={lastmod}
            onChange={(e) => setLastmod(e.target.value)}
            className="w-full border rounded-md p-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Change Frequency</label>
          <select
            value={changefreq}
            onChange={(e) => setChangefreq(e.target.value)}
            className="w-full border rounded-md p-2 text-sm"
          >
            <option value="always">always</option>
            <option value="hourly">hourly</option>
            <option value="daily">daily</option>
            <option value="weekly">weekly</option>
            <option value="monthly">monthly</option>
            <option value="yearly">yearly</option>
            <option value="never">never</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Priority</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="1"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border rounded-md p-2 text-sm"
          />
        </div>
      </div>

      {/* Output */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Generated sitemap.xml
        </label>
        <div className="relative">
          <pre className="bg-gray-100 text-sm p-4 rounded-md overflow-auto whitespace-pre-wrap">
            {sitemapXml}
          </pre>
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 bg-white border p-1 rounded hover:bg-gray-200"
          >
            <Copy size={16} />
          </button>
          {copied && (
            <p className="text-green-600 text-xs mt-2">
              Berhasil disalin ke clipboard!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
