import { Code, Wrench, LifeBuoy, Settings, MonitorCheck } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Laravel Web Development",
    description:
      "Development and maintenance of database-driven web applications using Laravel. Work is fully remote.",
    icon: <Code className="w-6 h-6 text-blue-600" />,
  },
  {
    title: "Bug Fixing & Debugging",
    description:
      "Fix issues in existing websites or apps—both front-end and back-end. Remote service with quick turnaround.",
    icon: <Wrench className="w-6 h-6 text-red-500" />,
  },
  {
    title: "IT Support & Maintenance",
    description:
      "Remote support for system setup, server configuration, troubleshooting, and regular maintenance.",
    icon: <LifeBuoy className="w-6 h-6 text-green-600" />,
  },
  {
    title: "System Installation & Configuration",
    description:
      "Remote setup or reinstallation of Linux-based systems for stable and optimized performance.",
    icon: <Settings className="w-6 h-6 text-yellow-500" />,
  },
  {
    title: "Remote Technical Support",
    description:
      "Help resolve software issues, perform checks, or assist users via remote sessions.",
    icon: <MonitorCheck className="w-6 h-6 text-purple-600" />,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Layanan</h2>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Jasa yang saya tawarkan sebagai Software Engineer
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mb-4">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
