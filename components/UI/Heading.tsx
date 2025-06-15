import { HeadingProps } from "@/types/components/types";
import useLoading from "@/composables/hook/useLoading";
import Skeleton from "react-loading-skeleton";
import { motion } from "framer-motion";

export default function Heading({ name, title, stack }: HeadingProps) {
  const { isLoading } = useLoading(true, 500);

  return (
    <section className="bg-gradient-to-r from-gray-300 via-gray-400 to-gray-600 md:pb-10">
      <div className="mx-auto max-w-screen-xl px-4 py-20 md:py-32 lg:flex md:h-1 lg:items-center">
        <div className="max-w-3xl text-start mt-16 md:mt-10 lg:mt-36 mx-12">
          <motion.h1
            className="bg-clip-text text-black text-3xl font-extrabold sm:text-5xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {isLoading ? <Skeleton key="heading-skeleton-name" /> : name}
          </motion.h1>

          <motion.p
            className="mt-4 max-w-xl sm:text-xl/relaxed"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {isLoading ? <Skeleton key="heading-skeleton-title" /> : title}
          </motion.p>
          <motion.p
            className="mt-1 mb-3"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            {isLoading ? (
              <Skeleton key="heading-skeleton-stack" />
            ) : (
              stack?.title ?? ""
            )}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
