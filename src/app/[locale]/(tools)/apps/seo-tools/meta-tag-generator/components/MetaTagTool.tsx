"use client";

import { useState, useRef } from "react";
import { FileText, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast"; // ✅ impor toast
import NativeToolLayout from "@/src/app/[locale]/(tools)/apps/components/NativeToolLayout";

export default function MetaTagTool() {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("Contoh Judul Halaman");
  const [description, setDescription] = useState(
    "Ini adalah deskripsi SEO yang akan muncul di hasil pencarian dan preview media sosial."
  );
  const [canonical, setCanonical] = useState("https://contoh.com");
  const [ogImage, setOgImage] = useState("https://contoh.com/og-image.jpg");
  const [twitterCard, setTwitterCard] = useState("summary_large_image");
  const textareaRef = useRef<HTMLPreElement>(null);

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

  // ✅ handleCopy dengan toast
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(metaTags);
      toast.success("Meta tag berhasil disalin!", {
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

  // ✅ MODE AWAL
  if (!isEditing) {
    return (
      <div className="min-h-screen bg-background font-sans flex flex-col">
        <div className="flex-1 flex flex-col items-center px-4 pt-10 pb-12">
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

          <h1 className="text-2xl font-bold text-foreground text-center mb-2 max-w-[320px]">
            Generate SEO meta tags
          </h1>

          <p className="text-muted-foreground text-center text-sm mb-8 max-w-xs">
            Create title, description, Open Graph & Twitter cards in seconds.
          </p>

          <button
            onClick={handleStartEditing}
            className="w-full max-w-xs py-3 bg-primary text-primary-foreground rounded-lg font-medium text-center transition-colors hover:bg-primary/90 active:opacity-90 select-none shadow-sm"
          >
            Buat Meta Tag
          </button>

          <div className="mt-6 flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5" strokeWidth={2.5} />
            100% client-side • No data leaves your device
          </div>
        </div>
      </div>
    );
  }

  // ✅ MODE EDITING
  return (
    <NativeToolLayout
      title="Meta Tag"
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Canonical URL
            </label>
            <input
              type="url"
              value={canonical}
              onChange={(e) => setCanonical(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              OG Image URL
            </label>
            <input
              type="url"
              value={ogImage}
              onChange={(e) => setOgImage(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Twitter Card Type
            </label>
            <select
              value={twitterCard}
              onChange={(e) => setTwitterCard(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white"
            >
              <option value="summary">summary</option>
              <option value="summary_large_image">summary_large_image</option>
            </select>
          </div>
        </div>

        {/* Output */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Generated Meta Tags
          </label>
          <pre className="bg-white border border-gray-300 text-sm p-3 rounded-lg overflow-auto whitespace-pre-wrap max-h-40">
            {metaTags}
          </pre>
        </div>
      </div>
    </NativeToolLayout>
  );
}
