import { HeadingProps } from "@/types/components/types";
import useLoading from "@/composables/hook/useLoading";
import Skeleton from "react-loading-skeleton";
import { motion } from "framer-motion";

export default function Heading({ name, title, stack }: HeadingProps) {
  const { isLoading } = useLoading(true, 500);

  return (
    <section className="bg-linear-to-b from-white to-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {isLoading ? <Skeleton height={40} width={300} /> : name}
          </motion.h1>

          <motion.p
            className="mt-6 text-lg md:text-xl text-gray-600"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {isLoading ? <Skeleton height={24} width={350} /> : title}
          </motion.p>

          {stack?.title && (
            <motion.p
              className="mt-2 text-sm text-gray-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {isLoading ? <Skeleton height={20} width={200} /> : stack.title}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
