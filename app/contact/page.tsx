"use client";

import { useState } from "react";
import Heading from "@/components/UI/Heading";

export default function ProjectProfesional() {
  return (
    <>
      <Heading name="Contact" title="Software Developer / IT Support" />
      <ContactUs />
    </>
  );
}

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    industry: "",
    priority: "",
    need: "",
    message: "",
    budget: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12">
        {/* Left Column */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
            Web Development & IT Support
          </h2>
          <p className="text-gray-600 mb-8 text-base leading-relaxed">
            Simple, practical solutions for teams who need reliable systems
            without unnecessary complexity.
          </p>

          <div className="space-y-6">
            <FeatureItem
              title="Custom Internal Tools"
              description="Build systems for inventory, reporting, or workflows—fully tailored to your process."
            />
            <FeatureItem
              title="Remote IT Support"
              description="Setup, troubleshooting, or server config—done remotely and efficiently."
            />
            <FeatureItem
              title="Affordable Maintenance"
              description="Ensure smooth operation with updates, bug fixes, and regular checks."
            />
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="bg-gray-50 p-8 rounded-2xl shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Your name"
              value={formData.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <Input
              type="email"
              placeholder="Your email"
              value={formData.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <Input
              placeholder="Company name (optional)"
              value={formData.companyName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, companyName: e.target.value })
              }
            />
            <Select
              value={formData.industry}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setFormData({ ...formData, industry: e.target.value })
              }
              options={[
                "Startup",
                "Small Business",
                "Enterprise",
                "NGO / Community",
                "Other",
              ]}
              placeholder="Your industry"
            />
            <Select
              value={formData.need}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setFormData({ ...formData, need: e.target.value })
              }
              options={["Web Development", "IT Support", "Both", "Other"]}
              placeholder="What do you need help with?"
            />
            <TextArea
              value={formData.message}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Tell me a bit about your project..."
            />
            <Select
              value={formData.budget}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setFormData({ ...formData, budget: e.target.value })
              }
              options={["< $500", "$500–$2000", "$2000+"]}
              placeholder="Estimated budget (optional)"
            />
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Get in Touch
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// === Reusable Components ===

function Input({ type = "text", ...props }) {
  return (
    <input
      type={type}
      {...props}
      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  );
}

function Select({ value, onChange, options, placeholder }: any) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
    >
      <option value="">{placeholder}</option>
      {options.map((opt: string, i: number) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

function TextArea({ value, onChange, placeholder }: any) {
  return (
    <textarea
      rows={4}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  );
}

function FeatureItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
