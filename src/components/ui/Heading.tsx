import { HeadingProps } from "@/types/components/types";
import useLoading from "@/composables/hook/useLoading";
import { motion } from "framer-motion";

export default function Heading({
  name,
  title,
  stack,
  backgroundImage,
}: HeadingProps & { backgroundImage?: string }) {
  const { isLoading } = useLoading(true, 500);

  return (
    <section
      className="relative bg-gray-100 bg-cover bg-center"
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-white tracking-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {isLoading ? "Loading..." : name}
        </motion.h1>

        <motion.p
          className="mt-6 text-lg md:text-xl text-white/90"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {isLoading ? "Loading..." : title}
        </motion.p>

        {stack?.title && (
          <motion.p
            className="mt-2 text-sm text-white/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {isLoading ? "Loading..." : stack.title}
          </motion.p>
        )}
      </div>
    </section>
  );
}
