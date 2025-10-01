import React from "react";
import {
  Code,
  Wrench,
  LifeBuoy,
  Settings,
  MonitorCheck,
  Calculator,
  Brain,
  FileText,
  ImageIcon,
} from "lucide-react";
import Link from "next/link";

interface ToolCategory {
  name: string;
  icon: React.ReactNode;
}

interface Service {
  title: string;
  icon: React.ReactNode;
}

// Tool Categories w/ Icons
const toolCategories: ToolCategory[] = [
  {
    name: "Calculator",
    icon: <Calculator className="w-4 h-4 text-orange-500" />,
  },
  { name: "Mental Health", icon: <Brain className="w-4 h-4 text-pink-500" /> },
  { name: "Documents", icon: <FileText className="w-4 h-4 text-blue-400" /> },
  {
    name: "Image Tools",
    icon: <ImageIcon className="w-4 h-4 text-purple-400" />,
  },
];

const services: Service[] = [
  {
    title: "Laravel Web Development",
    icon: <Code className="w-4 h-4 text-blue-600" />,
  },
  {
    title: "Bug Fixing & Debugging",
    icon: <Wrench className="w-4 h-4 text-red-500" />,
  },
  {
    title: "IT Support & Maintenance",
    icon: <LifeBuoy className="w-4 h-4 text-green-600" />,
  },
  {
    title: "System Installation & Config",
    icon: <Settings className="w-4 h-4 text-yellow-500" />,
  },
  {
    title: "Remote Technical Support",
    icon: <MonitorCheck className="w-4 h-4 text-purple-600" />,
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {/* Tools Categories */}
        <div>
          <h4 className="font-semibold text-base mb-4">Tools</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            {toolCategories.map((tool, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 hover:text-white transition"
              >
                {/* {tool.icon} */}
                {tool.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-semibold text-base mb-4">Services</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            {services.map((service, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 hover:text-white transition"
              >
                {/* {service.icon} */}
                {service.title}
              </li>
            ))}
          </ul>
        </div>

        {/* About */}
        <div>
          <h4 className="font-semibold text-base mb-4">About</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>
              <Link
                prefetch
                href="terms-of-services"
                className="hover:text-white"
              >
                terms of service
              </Link>
            </li>
            <li>
              <Link prefetch href="privacy-policy" className="hover:text-white">
                privacy policy
              </Link>
            </li>
            <li>
              <Link prefetch href="contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-semibold text-base mb-4">Stay Updated</h4>
          <p className="text-sm text-gray-400 mb-4">
            Dapatkan info tools dan produk terbaru.
          </p>
          <input
            type="email"
            placeholder="Email kamu..."
            className="w-full p-2 rounded bg-gray-800 text-white text-sm focus:outline-none"
          />
          <button className="mt-2 px-4 py-2 bg-blue-600 text-sm rounded hover:bg-blue-700 transition w-full">
            Subscribe
          </button>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 text-center border-t border-gray-800 pt-6 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Build With Love. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
