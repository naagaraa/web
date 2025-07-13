export default function ComingSoonPage() {
  const upcomingCategories = [
    {
      id: "ai-tools",
      label: "AI Tools",
      tools: [
        {
          name: "AI Writing Assistant",
          slug: "apps/ai/writing-assistant",
          description: "Buat artikel, email, atau copywriting dengan AI.",
        },
        {
          name: "Resume & Cover Letter Generator",
          slug: "apps/ai/resume-builder",
          description: "Buat resume profesional dan cover letter otomatis.",
        },
        {
          name: "AI Image Generator",
          slug: "apps/ai/image-generator",
          description: "Buat gambar dari teks menggunakan AI (text-to-image).",
        },
      ],
    },
    {
      id: "business-tools",
      label: "Business",
      tools: [
        {
          name: "Invoice Generator",
          slug: "apps/business/invoice-generator",
          description: "Buat dan kirim invoice profesional secara instan.",
        },
        {
          name: "Contract Template Builder",
          slug: "apps/business/contracts",
          description:
            "Generate kontrak kerja, NDA, dan dokumen legal lainnya.",
        },
        {
          name: "Business Name Generator",
          slug: "apps/business/name-generator",
          description: "Cari nama bisnis unik dan domain yang tersedia.",
        },
      ],
    },
    {
      id: "content-creator",
      label: "Content Creator",
      tools: [
        {
          name: "YouTube Thumbnail Maker",
          slug: "apps/creator/youtube-thumbnail",
          description: "Desain thumbnail menarik untuk channel YouTube Anda.",
        },
        {
          name: "Script Generator",
          slug: "apps/creator/script-generator",
          description: "Generate script video YouTube atau TikTok dengan AI.",
        },
        {
          name: "Hashtag Generator",
          slug: "apps/creator/hashtag-generator",
          description:
            "Optimalkan jangkauan sosial media dengan hashtag tepat.",
        },
      ],
    },
    {
      id: "writing-tools",
      label: "Writing",
      tools: [
        {
          name: "Plagiarism Checker",
          slug: "apps/writing/plagiarism-checker",
          description: "Cek keaslian tulisan secara real-time.",
        },
        {
          name: "Grammar Corrector",
          slug: "apps/writing/grammar-corrector",
          description: "Perbaiki grammar dan ejaan secara otomatis.",
        },
        {
          name: "Essay Outliner",
          slug: "apps/writing/essay-outliner",
          description:
            "Buat kerangka tulisan dengan AI untuk esai dan artikel.",
        },
      ],
    },
    {
      id: "ecommerce",
      label: "E-Commerce",
      tools: [
        {
          name: "Product Description Generator",
          slug: "apps/ecommerce/description-generator",
          description: "Buat deskripsi produk yang SEO-friendly otomatis.",
        },
        {
          name: "Pricing Calculator",
          slug: "apps/ecommerce/pricing-calculator",
          description: "Hitung margin, profit, dan harga jual optimal.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-16 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        🚀 Tools Are Coming Soon
      </h1>
      <p className="text-gray-600 max-w-xl mb-10">
        We’re building a suite of useful tools across various categories to help
        you work smarter and faster. Stay tuned!
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-4xl">
        {upcomingCategories.map((category, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 shadow-sm rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:shadow-md transition text-center"
          >
            {category.label}
          </div>
        ))}
      </div>
    </div>
  );
}
