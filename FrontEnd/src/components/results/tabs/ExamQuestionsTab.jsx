import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";

const ExamQuestionsTab = () => {
  const { currentSnapNote } = useSelector((state) => state.snapNotes);
  const examQuestions = currentSnapNote?.exam_questions || [];

  const [openId, setOpenId] = useState(null);
  const [readIds, setReadIds] = useState(new Set());

  const toggleQuestion = (id) => {
    if (openId === id) {
      setOpenId(null);
    } else {
      setOpenId(id);
      setReadIds((prev) => new Set([...prev, id]));
    }
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

  if (examQuestions.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-snap-text-muted">No exam questions available for this note.</p>
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
      {examQuestions.map((item, index) => (
        <motion.div
          key={index}
          className={cn(
            "glass-card overflow-hidden transition-all duration-300 cursor-pointer",
            openId === index && "border-primary/30 ring-1 ring-primary/20"
          )}
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
        >
          <button
            onClick={() => toggleQuestion(index)}
            className="w-full p-6 flex items-center justify-between gap-4 text-left hover:bg-snap-bg-panel/30 transition-colors"
          >
            <div className="flex items-center gap-4">
              <motion.span
                className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary font-semibold text-small"
                animate={{ scale: openId === index ? 1.1 : 1 }}
                transition={{ duration: 0.2 }}
              >
                {index + 1}
              </motion.span>
              <span className="text-body text-snap-text-primary font-medium">{item.question}</span>
            </div>
            <div className="flex items-center gap-3">
              <AnimatePresence mode="wait">
                {readIds.has(index) && (
                  <motion.span
                    className="flex items-center gap-1 text-[12px] text-snap-mint"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check className="w-3 h-3" />
                    Read
                  </motion.span>
                )}
              </AnimatePresence>
              <motion.div
                animate={{ rotate: openId === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5 text-snap-text-muted" />
              </motion.div>
            </div>
          </button>

          <AnimatePresence>
            {openId === index && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6 pt-0 border-t border-border/50">
                  <motion.div
                    className="p-4 rounded-xl bg-snap-bg-panel"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.3 }}
                  >
                    <p className="text-small text-snap-text-secondary leading-relaxed">{item.answer}</p>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ExamQuestionsTab;
