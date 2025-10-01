"use client";

import Heading from "@/src/components/ui/Heading";
import Footer from "@/src/components/layout/Footer";
import { CheckCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function PricingPage() {
  return (
    <>
      <Heading
        backgroundImage="https://images.unsplash.com/photo-1555043722-4523972f07ee?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        name="Pricing"
        title="Simple Pricing for Everyone"
      />
      <PricingSection />
      <Footer />
    </>
  );
}

function PricingSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          All Tools are Free — For Now
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-gray-600 mb-12 max-w-2xl mx-auto text-base"
        >
          We believe in giving access to everyone. All tools are currently free
          to use. Our paid plans are coming soon with additional features and
          dedicated support.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <PlanCard
            title="Free Plan"
            price="Rp 0"
            description="Unlimited access to all current tools."
            features={[
              "Unlimited usage",
              "All categories",
              "No signup required",
              "Regular updates",
            ]}
            highlight
            ctaLabel="Start Using"
            ctaHref="/apps"
          />
          <PlanCard
            title="Pro Plan"
            price="Coming Soon"
            description="Ideal for teams needing more control and reliability."
            features={[
              "Priority access",
              "Faster load & dedicated resources",
              "Team collaboration features",
              "Early access to beta tools",
            ]}
            comingSoon
          />
          <PlanCard
            title="Enterprise"
            price="Coming Soon"
            description="Custom plans for large teams or special integrations."
            features={[
              "Custom tools & workflows",
              "Dedicated support",
              "SLA & Uptime guarantees",
              "Integration with internal systems",
            ]}
            comingSoon
          />
        </div>
      </div>
    </section>
  );
}

function PlanCard({
  title,
  price,
  description,
  features,
  highlight = false,
  comingSoon = false,
  ctaLabel,
  ctaHref,
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
  comingSoon?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`border rounded-2xl p-6 shadow-sm hover:shadow-lg transition ${
        highlight ? "border-blue-500" : "border-gray-200"
      }`}
    >
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-500 text-sm mt-1">{description}</p>

      <div className="text-3xl font-bold text-gray-900 my-4">{price}</div>

      <ul className="text-left space-y-3 text-sm text-gray-700 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2">
            {comingSoon ? (
              <Clock className="w-4 h-4 text-gray-400 mt-1" />
            ) : (
              <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
            )}
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {ctaLabel && ctaHref && (
        <a
          href={ctaHref}
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition text-sm"
        >
          {ctaLabel}
        </a>
      )}

      {comingSoon && (
        <div className="text-xs text-orange-500 font-medium uppercase tracking-wide">
          Coming Soon
        </div>
      )}
    </motion.div>
  );
}
