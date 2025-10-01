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
    <section
      id="services"
      className="py-20 bg-gradient-to-b from-gray-50 to-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Layanan
          </h2>
          <p className="text-gray-600 mt-3 text-sm sm:text-base max-w-xl mx-auto">
            Jasa yang saya tawarkan sebagai Software Engineer
          </p>
        </div>

        {/* Services Grid */}
        {/* Mobile: horizontal scroll */}
        <div className="flex md:hidden overflow-x-auto gap-4 pb-4 snap-x snap-mandatory hide-scrollbar">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-72 snap-start group perspective"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-sm transition-transform duration-300 ease-out hover:shadow-lg hover:-translate-y-1 hover:scale-105 hover:rotate-1 transform-gpu flex flex-col justify-between h-80">
                <div>
                  <div className="flex items-center justify-center w-14 h-14 bg-gray-100 rounded-lg mb-4 group-hover:bg-gray-200 transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 auto-rows-fr grid-flow-row-dense">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group perspective"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-sm transition-transform duration-300 ease-out hover:shadow-lg hover:-translate-y-1 hover:scale-105 hover:rotate-1 transform-gpu flex flex-col justify-between h-80">
                <div>
                  <div className="flex items-center justify-center w-14 h-14 bg-gray-100 rounded-lg mb-4 group-hover:bg-gray-200 transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Optional: perspective class for 3D tilt */}
      <style jsx>{`
        .perspective {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
}
