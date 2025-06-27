import { motion } from "framer-motion";
import Image from "next/image";
import heroImage from "@/assets/hero.png";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="py-24 bg-slate-100 mb-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
        {/* Kolom Kiri - Teks */}
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="text-sm font-medium text-blue-600 uppercase tracking-wide mb-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            Tools & Services to Empower Your Team
          </motion.p>

          <motion.h1
            className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Everything You Need to Work Smarter — in One Place
          </motion.h1>

          <motion.p
            className="text-gray-600 text-lg mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Access powerful tools to manage your team's workflow, and expert
            services to help you scale. Whether you're organizing tasks or
            improving collaboration — we’ve got you covered.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Link
              href="#tools"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("tools")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              Explore Our Tools
            </Link>

            <Link
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-blue-600 border border-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition"
            >
              Discover Our Services
            </Link>
          </motion.div>
        </motion.div>

        {/* Kolom Kanan - Gambar */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src={heroImage}
            alt="Team Collaboration Illustration"
            width={500}
            height={300}
            className="w-full max-w-md mx-auto object-contain"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
