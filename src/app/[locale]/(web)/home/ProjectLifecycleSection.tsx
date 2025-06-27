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
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Software Development Roadmap
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We provide a comprehensive software development service to create
          powerful and competitive solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            className="bg-white rounded-xl shadow-md p-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-green-700 border-2 border-green-600 w-8 h-8 flex items-center justify-center rounded-full font-bold">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {step.title}
              </h3>
            </div>
            <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
              {step.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
