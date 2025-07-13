"use client";

import { useState } from "react";
import { Copy } from "lucide-react";

export default function RobotsTxtTool() {
  const [userAgent, setUserAgent] = useState("*");
  const [disallow, setDisallow] = useState(["/admin", "/private"]);
  const [allow, setAllow] = useState(["/"]);
  const [sitemap, setSitemap] = useState("https://example.com/sitemap.xml");
  const [copied, setCopied] = useState(false);

  const robotsTxt = `
User-agent: ${userAgent}
${allow.map((path) => `Allow: ${path}`).join("\n")}
${disallow.map((path) => `Disallow: ${path}`).join("\n")}
Sitemap: ${sitemap}
`.trim();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(robotsTxt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleListChange = (
    index: number,
    type: "allow" | "disallow",
    value: string
  ) => {
    const list = type === "allow" ? [...allow] : [...disallow];
    list[index] = value;
    if (type === "allow") {
      setAllow(list);
    } else {
      setDisallow(list);
    }
  };

  const handleAddPath = (type: "allow" | "disallow") => {
    const list = type === "allow" ? [...allow, ""] : [...disallow, ""];
    if (type === "allow") {
      setAllow(list);
    } else {
      setDisallow(list);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Robots.txt Generator</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">User-agent</label>
          <input
            type="text"
            value={userAgent}
            onChange={(e) => setUserAgent(e.target.value)}
            className="w-full border rounded-md p-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Allow Paths</label>
          {allow.map((path, i) => (
            <input
              key={`allow-${i}`}
              type="text"
              value={path}
              onChange={(e) => handleListChange(i, "allow", e.target.value)}
              className="w-full border rounded-md p-2 text-sm mb-2"
            />
          ))}
          <button
            onClick={() => handleAddPath("allow")}
            className="text-blue-600 text-sm hover:underline"
          >
            + Tambah Path Allow
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Disallow Paths
          </label>
          {disallow.map((path, i) => (
            <input
              key={`disallow-${i}`}
              type="text"
              value={path}
              onChange={(e) => handleListChange(i, "disallow", e.target.value)}
              className="w-full border rounded-md p-2 text-sm mb-2"
            />
          ))}
          <button
            onClick={() => handleAddPath("disallow")}
            className="text-blue-600 text-sm hover:underline"
          >
            + Tambah Path Disallow
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium">Sitemap URL</label>
          <input
            type="url"
            value={sitemap}
            onChange={(e) => setSitemap(e.target.value)}
            className="w-full border rounded-md p-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Generated robots.txt
        </label>
        <div className="relative">
          <pre className="bg-gray-100 text-sm p-4 rounded-md overflow-auto whitespace-pre-wrap">
            {robotsTxt}
          </pre>
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 bg-white border p-1 rounded hover:bg-gray-200"
          >
            <Copy size={16} />
          </button>
          {copied && (
            <p className="text-green-600 text-xs mt-2">Berhasil disalin!</p>
          )}
        </div>
      </div>
    </div>
  );
}
