import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const KeyTermsTab = () => {
  const { currentSnapNote } = useSelector((state) => state.snapNotes);
  const rawTerms = currentSnapNote?.snapNotes?.key_terms || [];

  const keyTerms = rawTerms.map(item => {
    const parts = item.split(': ');
    if (parts.length > 1) {
      return { term: parts[0], definition: parts.slice(1).join(': '), category: "General" };
    }
    return { term: item, definition: "", category: "General" };
  });

  const categoryColors = {
    "General": "bg-primary/10 text-primary",
    "Data": "bg-snap-cyan/10 text-snap-cyan",
    "Core Concepts": "bg-primary/10 text-primary",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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

  if (keyTerms.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-snap-text-muted">No key terms available for this note.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {keyTerms.map((item, index) => (
        <motion.div
          key={index}
          className="glass-card p-5 hover:border-primary/30 cursor-pointer group transition-all duration-300 hover-lift"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <h4 className="text-body font-semibold text-snap-text-primary group-hover:text-primary transition-colors">{item.term}</h4>
            <motion.span
              className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${categoryColors[item.category] || categoryColors.General}`}
              whileHover={{ scale: 1.1 }}
            >
              {item.category}
            </motion.span>
          </div>
          {item.definition && (
            <p className="text-small text-snap-text-secondary leading-relaxed group-hover:text-snap-text-primary transition-colors">
              {item.definition}
            </p>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default KeyTermsTab;
