import { HeadingProps } from "@/types/components/types";
import useLoading from "@/composables/hook/useLoading";
import { motion } from "framer-motion";

export default function Heading({
  name,
  title,
  stack,
  backgroundImage,
  backgroundColor = "bg-gray-100", // default bg
  textColor = "text-white", // default text
}: HeadingProps & {
  backgroundImage?: string;
  backgroundColor?: string;
  textColor?: string;
}) {
  const { isLoading } = useLoading(true, 500);

  return (
    <section
      className={`relative bg-cover bg-center ${backgroundColor}`}
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 text-center">
        <motion.h1
          className={`text-4xl md:text-6xl font-extrabold tracking-tight ${textColor}`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {isLoading ? "Loading..." : name}
        </motion.h1>

        <motion.p
          className={`mt-6 text-lg md:text-xl ${textColor}/90`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {isLoading ? "Loading..." : title}
        </motion.p>

        {stack?.title && (
          <motion.p
            className={`mt-2 text-sm ${textColor}/70`}
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
