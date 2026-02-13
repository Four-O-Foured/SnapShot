import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

const CleanNotesTab = () => {
  const { currentSnapNote } = useSelector((state) => state.snapNotes);
  const [copiedId, setCopiedId] = useState(null);

  const notes = currentSnapNote?.clean_notes || [];

  const handleCopy = (id, content) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  if (notes.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-snap-text-muted">No notes available for this section.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {notes.map((content, index) => (
        <motion.div
          key={index}
          className="glass-card p-6 group hover:border-primary/30 transition-all duration-300 hover-lift cursor-pointer"
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-body font-semibold text-snap-text-primary mb-2 group-hover:text-primary transition-colors">
                Section {index + 1}
              </h3>
              <p className="text-small text-snap-text-secondary leading-relaxed group-hover:text-snap-text-secondary transition-colors">
                {content}
              </p>
            </div>
            <motion.button
              onClick={() => handleCopy(index, content)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg hover:bg-snap-bg-panel shrink-0"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {copiedId === index ? (
                  <motion.div
                    key="check"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check className="w-4 h-4 text-snap-mint" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Copy className="w-4 h-4 text-snap-text-muted" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CleanNotesTab;
