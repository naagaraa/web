"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "1",
    title: "Analysis",
    items: [
      "Discovering business needs",
      "Eliciting requirements",
      "Defining project scope",
    ],
  },
  {
    number: "2",
    title: "Defining Project Scope",
    items: [
      "Designing software architecture",
      "Planning projects and budgeting",
      "Selecting implementation approach and development methodology",
    ],
  },
  {
    number: "3",
    title: "Development & Quality Assurance",
    items: [
      "Developing front-end and back-end",
      "Conducting ongoing testing and quality assurance reporting",
      "Developing integration solutions",
    ],
  },
  {
    number: "4",
    title: "Deployment",
    items: [
      "Deploying to the production environment",
      "Migrating data",
      "Conducting user acceptance testing",
    ],
  },
  {
    number: "5",
    title: "Support",
    items: [
      "Maintaining software",
      "Monitoring continuously",
      "Upgrading functions on demand",
    ],
  },
];

export default function RoadmapSection() {
  return (
    <section className="relative py-16 px-4 max-w-7xl mx-auto overflow-hidden">
      {/* Animated Gradient Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(120deg, #93c5fd, #bfdbfe, #dbeafe, #93c5fd)`,
          backgroundSize: "400% 400%",
          animation: "gradient-move 20s ease infinite",
        }}
      />

      {/* Moving Wave Overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(59,130,246,0.2), transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(147,197,253,0.15), transparent 50%)
          `,
          animation: "wave-move 25s ease-in-out infinite",
        }}
      />

      {/* Section Header */}
      <div className="relative z-10 text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Software Development Roadmap
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          We provide a comprehensive software development service to create
          powerful and competitive solutions.
        </p>
      </div>

      {/* Steps Grid */}
      <div className="relative z-10">
        {/* Mobile: horizontal scroll / slide */}
        <div className="flex md:hidden overflow-x-auto gap-4 pb-4 snap-x snap-mandatory hide-scrollbar">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="flex-shrink-0 w-80 snap-start group perspective"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm p-6 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-105 hover:rotate-1 transform-gpu h-full">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-green-600 text-green-700 font-bold">
                    {step.number}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                    {step.title}
                  </h3>
                </div>
                <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm sm:text-base">
                  {step.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr grid-flow-row-dense">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="group perspective"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm p-6 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-105 hover:rotate-1 transform-gpu h-full">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-green-600 text-green-700 font-bold">
                    {step.number}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                    {step.title}
                  </h3>
                </div>
                <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm sm:text-base">
                  {step.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        .perspective {
          perspective: 1000px;
        }

        @keyframes gradient-move {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes wave-move {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(20px, -20px) rotate(5deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(-5deg);
          }
        }
      `}</style>
    </section>
  );
}
