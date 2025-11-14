"use client";

import { useState } from "react";
import { Copy, ShieldCheck, FileText } from "lucide-react";
import toast from "react-hot-toast";
import NativeToolLayout from "@/src/app/[locale]/(tools)/apps/components/NativeToolLayout";

export default function RobotsTxtTool() {
  const [isEditing, setIsEditing] = useState(false);
  const [userAgent, setUserAgent] = useState("*");
  const [disallow, setDisallow] = useState(["/admin", "/private"]);
  const [allow, setAllow] = useState(["/"]);
  const [sitemap, setSitemap] = useState("https://example.com/sitemap.xml");

  const robotsTxt = `
User-agent: ${userAgent}
${allow.map((path) => `Allow: ${path}`).join("\n")}
${disallow.map((path) => `Disallow: ${path}`).join("\n")}
Sitemap: ${sitemap}
`.trim();

  // ✅ Handle salin dengan toast
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(robotsTxt);
      toast.success("robots.txt berhasil disalin!", {
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
            Generate robots.txt
          </h1>

          {/* Microcopy SaaS */}
          <p className="text-muted-foreground text-center text-sm mb-8 max-w-xs">
            Create a robots.txt file to control how search engines crawl your
            site.
          </p>

          {/* CTA utama */}
          <button
            onClick={handleStartEditing}
            className="w-full max-w-xs py-3 bg-primary text-primary-foreground rounded-lg font-medium text-center transition-colors hover:bg-primary/90 active:opacity-90 select-none shadow-sm"
          >
            Buat robots.txt
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
      title="robots.txt"
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
              User-agent
            </label>
            <input
              type="text"
              value={userAgent}
              onChange={(e) => setUserAgent(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Allow Paths
            </label>
            {allow.map((path, i) => (
              <input
                key={`allow-${i}`}
                type="text"
                value={path}
                onChange={(e) => handleListChange(i, "allow", e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white mb-2"
              />
            ))}
            <button
              onClick={() => handleAddPath("allow")}
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              + Tambah Path Allow
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Disallow Paths
            </label>
            {disallow.map((path, i) => (
              <input
                key={`disallow-${i}`}
                type="text"
                value={path}
                onChange={(e) =>
                  handleListChange(i, "disallow", e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white mb-2"
              />
            ))}
            <button
              onClick={() => handleAddPath("disallow")}
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              + Tambah Path Disallow
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sitemap URL
            </label>
            <input
              type="url"
              value={sitemap}
              onChange={(e) => setSitemap(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm bg-white"
            />
          </div>
        </div>

        {/* Output */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Generated robots.txt
          </label>
          <pre className="bg-white border border-gray-300 text-sm p-3 rounded-lg overflow-auto whitespace-pre-wrap max-h-40">
            {robotsTxt}
          </pre>
        </div>
      </div>
    </NativeToolLayout>
  );
}
