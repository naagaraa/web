"use client";

import { useState } from "react";
import { Copy, ShieldCheck, FileText } from "lucide-react";
import toast from "react-hot-toast";
import NativeToolLayout from "@/src/app/[locale]/(tools)/apps/components/NativeToolLayout";

export default function SitemapTool() {
  const [isEditing, setIsEditing] = useState(false);
  const [urls, setUrls] = useState(["https://example.com/"]);
  const [lastmod, setLastmod] = useState("");
  const [changefreq, setChangefreq] = useState("monthly");
  const [priority, setPriority] = useState("0.8");

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

  // ✅ Handle salin dengan toast
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sitemapXml);
      toast.success("sitemap.xml berhasil disalin!", {
        duration: 2000,
        position: "bottom-center",
      });
    } catch (err) {
      console.error("Gagal menyalin:", err);
      toast.error("Gagal menyalin ke clipboard", {
        duration: 2500,
        position: "bottom-center",
      });
    }
  };

  const handleStartEditing = () => setIsEditing(true);
  const handleBack = () => setIsEditing(false);

  // ✅ MODE AWAL: TAMPILAN PROMOSI
  if (!isEditing) {
    return (
      <div className="min-h-screen bg-background font-sans flex flex-col">
        <div className="flex-1 flex flex-col items-center px-4 pt-10 pb-12">
          {/* Header branding */}
          <div className="mb-2">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="size-4 text-primary" strokeWidth={2} />
              </div>
              <span className="text-sm font-semibold text-foreground">
                Tools
              </span>
            </div>
          </div>

          {/* Judul utama */}
          <h1 className="text-2xl font-bold text-foreground text-center mb-2 max-w-[320px]">
            Generate sitemap.xml
          </h1>

          {/* Microcopy SaaS */}
          <p className="text-muted-foreground text-center text-sm mb-8 max-w-xs">
            Create a valid XML sitemap to help search engines index your
            website.
          </p>

          {/* CTA utama */}
          <button
            onClick={handleStartEditing}
            className="w-full max-w-xs py-3 bg-primary text-primary-foreground rounded-lg font-medium text-center transition-colors hover:bg-primary/90 active:opacity-90 select-none shadow-sm"
          >
            Buat Sitemap
          </button>

          {/* Trust badge */}
          <div className="mt-6 flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5" strokeWidth={2.5} />
            100% client-side • No data leaves your device
          </div>
        </div>
      </div>
    );
  }

  // ✅ MODE EDITING: PAKAI NATIVE TOOL LAYOUT
  return (
    <NativeToolLayout
      title="Sitemap"
      onBack={handleBack}
      actionButton={{
        label: "Salin",
        onClick: handleCopy,
        disabled: false,
        loading: false,
      }}
      contentClassName="bg-gray-50 p-4"
    >
      <div className="max-w-2xl mx-auto w-full space-y-5">
        {/* Form Input */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Daftar URL
            </label>
            {urls.map((url, i) => (
              <input
                key={i}
                type="url"
                value={url}
                onChange={(e) => handleUrlChange(i, e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white mb-2"
                placeholder={`https://example.com/page-${i + 1}`}
              />
            ))}
            <button
              onClick={handleAddUrl}
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              + Tambah URL
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Modified (opsional)
            </label>
            <input
              type="date"
              value={lastmod}
              onChange={(e) => setLastmod(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Change Frequency
            </label>
            <select
              value={changefreq}
              onChange={(e) => setChangefreq(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white"
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="1"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white"
            />
          </div>
        </div>

        {/* Output */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Generated sitemap.xml
          </label>
          <pre className="bg-white border border-gray-300 text-sm p-3 rounded-lg overflow-auto whitespace-pre-wrap max-h-40">
            {sitemapXml}
          </pre>
        </div>
      </div>
    </NativeToolLayout>
  );
}
