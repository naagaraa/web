"use client";

import Heading from "@/components/UI/Heading";
import WraperContent from "@/components/UI/WrapperContent";
import Image from "next/image";
import { useState } from "react";

export default function ProjectProfesional() {
  return (
    <>
      <Heading name="Contact" title="Software Developer" />
      {/* <WraperContent> */}
      {/* <p>On going</p> */}
      <ContactUs />
      {/* </WraperContent> */}
    </>
  );
}

interface ContactFormProps {
  onSubmit: (formData: any) => void;
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
    // Simpan data ke backend atau lakukan aksi lainnya
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6 flex flex-col md:flex-row gap-8">
        {/* Kolom Kiri */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">
            Web Development & IT Support for Your Daily Needs
          </h2>
          <p className="mb-8">
            Simple, practical solutions for teams that need reliable systems
            without the unnecessary complexity.
          </p>

          {/* Feature 1 */}
          <div className="flex items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">Custom Internal Tools</h3>
              <p>
                Build systems for things like inventory, reporting, or team
                workflows—fully tailored to how you work.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">Remote IT Support</h3>
              <p>
                Help with setup, troubleshooting, backups, or server
                config—handled remotely and affordably.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-center">
            <div>
              <h3 className="text-lg font-semibold">Affordable Maintenance</h3>
              <p>
                Keep your systems running smoothly with minimal cost—regular
                updates, bug fixes, and monitoring.
              </p>
            </div>
          </div>
        </div>

        {/* Kolom Kanan */}
        <div className="md:w-1/2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
            />

            <input
              type="email"
              placeholder="Your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="Your company name (optional)"
              value={formData.companyName}
              onChange={(e) =>
                setFormData({ ...formData, companyName: e.target.value })
              }
              className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
            />

            <select
              value={formData.industry}
              onChange={(e) =>
                setFormData({ ...formData, industry: e.target.value })
              }
              className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Your industry</option>
              <option value="Startup">Startup</option>
              <option value="Small Business">Small Business</option>
              <option value="Enterprise">Enterprise</option>
              <option value="NGO / Community">NGO / Community</option>
              <option value="Other">Other</option>
            </select>

            <select
              value={formData.need}
              onChange={(e) =>
                setFormData({ ...formData, need: e.target.value })
              }
              className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">What do you need help with?</option>
              <option value="Web Development">Web Development</option>
              <option value="IT Support">IT Support</option>
              <option value="Both">Both</option>
              <option value="Other">Other</option>
            </select>

            <textarea
              placeholder="Tell me a bit about the project or issue..."
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
              rows={4}
            />

            <select
              value={formData.budget}
              onChange={(e) =>
                setFormData({ ...formData, budget: e.target.value })
              }
              className="w-full p-3 border rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Estimated budget (optional)</option>
              <option value="<$500">&lt; $500</option>
              <option value="$500–$2000">$500–$2,000</option>
              <option value="$2000+">$2,000+</option>
            </select>

            <button
              type="submit"
              className="w-full bg-orange-400 text-white p-3 rounded-md hover:bg-orange-600 transition duration-300"
            >
              Get in Touch
            </button>
          </form>
        </div>
      </div>

      {/* Trusted by */}
      {/* <div className="mt-16 text-center">
        <p className="text-sm font-semibold mb-4">Trusted by</p>
        <div className="flex justify-center space-x-4">
          <Image
            src="https://assets.pikiran-rakyat.com/crop/0x0:0x0/720x0/webp/photo/2024/05/08/2700147190.jpg"
            alt="Logo 1"
            // width={50}
            // height={50}
          />
          <Image
            src="https://via.placeholder.com/50"
            alt="Logo 2"
            width={50}
            height={50}
          />
          <Image
            src="https://via.placeholder.com/50"
            alt="Logo 3"
            width={50}
            height={50}
          />
          <Image
            src="https://via.placeholder.com/50"
            alt="Logo 4"
            width={50}
            height={50}
          />
          <Image
            src="https://via.placeholder.com/50"
            alt="Logo 5"
            width={50}
            height={50}
          />
        </div>
      </div> */}
    </section>
  );
}
