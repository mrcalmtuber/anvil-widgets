import { motion } from "framer-motion";
import { Minus } from "lucide-react";

interface WidgetWrapperProps {
  children: React.ReactNode;
  colSpan?: 1 | 2;
  delay?: number;
  className?: string;
  onRemove?: () => void;
}

export function WidgetWrapper({
  children,
  colSpan = 1,
  delay = 0,
  className = "",
  onRemove,
}: WidgetWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ duration: 0.4, delay, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`bg-card border border-card-border rounded-[24px] overflow-hidden flex flex-col relative ${
        colSpan === 2 ? "col-span-2" : "col-span-1"
      } aspect-square ${colSpan === 2 ? "aspect-[2/1]" : ""} ${className}`}
    >
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center shadow-lg"
          data-testid="remove-badge"
        >
          <Minus className="w-3.5 h-3.5 text-white" />
        </button>
      )}
      {children}
    </motion.div>
  );
}
