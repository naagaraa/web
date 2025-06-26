"use client";

import { HandCoins, Coffee, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";

export default function Sponsorship() {
  return (
    <section className="min-h-screen bg-white py-20 px-6 md:mt-24 md:px-10">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h1
          className="text-3xl font-extrabold text-gray-900 md:text-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Dukung Saya
        </motion.h1>

        <motion.p
          className="mt-4 text-gray-600 text-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Bantu saya terus mengembangkan proyek open-source, tools, dan konten
          edukatif. Kamu bisa mendukung lewat platform lokal maupun
          internasional.
        </motion.p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* SAWERIA */}
          <SupportCard
            name="Saweria"
            description="Platform donasi populer di Indonesia."
            url="https://saweria.co/usernamekamu"
            icon={<HandCoins className="w-8 h-8 text-yellow-500" />}
          />

          {/* TRAKTEER */}
          <SupportCard
            name="Trakteer"
            description="Traktir kopi atau dukungan sekali klik."
            url="https://trakteer.id/usernamekamu"
            icon={<Coffee className="w-8 h-8 text-red-400" />}
          />

          {/* KO-FI */}
          <SupportCard
            name="Ko-fi"
            description="Dukungan internasional dengan USD / PayPal."
            url="https://ko-fi.com/usernamekamu"
            icon={<HeartHandshake className="w-8 h-8 text-blue-400" />}
          />

          {/* BUY ME A COFFEE */}
          <SupportCard
            name="Buy Me a Coffee"
            description="Simple & friendly way to get support."
            url="https://buymeacoffee.com/usernamekamu"
            icon={<Coffee className="w-8 h-8 text-yellow-600" />}
          />
        </div>

        <p className="mt-10 text-sm text-gray-500">
          Terima kasih banyak atas dukunganmu 🙏
        </p>
      </div>
    </section>
  );
}

function SupportCard({
  name,
  description,
  url,
  icon,
}: {
  name: string;
  description: string;
  url: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      className="border rounded-xl p-6 hover:shadow-lg transition bg-gray-50 flex flex-col items-start"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="mb-3">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-blue-600 hover:underline"
      >
        Dukung sekarang →
      </a>
    </motion.div>
  );
}
