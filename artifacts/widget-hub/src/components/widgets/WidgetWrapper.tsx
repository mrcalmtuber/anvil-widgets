import { motion } from "framer-motion";

interface WidgetWrapperProps {
  children: React.ReactNode;
  colSpan?: 1 | 2;
  delay?: number;
  className?: string;
}

export function WidgetWrapper({ children, colSpan = 1, delay = 0, className = "" }: WidgetWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`bg-card border border-card-border rounded-[24px] overflow-hidden flex flex-col relative ${
        colSpan === 2 ? "col-span-2" : "col-span-1"
      } aspect-square ${colSpan === 2 ? "aspect-[2/1]" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}
