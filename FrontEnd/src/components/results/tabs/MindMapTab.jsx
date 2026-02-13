import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Network, ArrowRight } from "lucide-react";

const MindMapTab = () => {
  const { currentSnapNote } = useSelector((state) => state.snapNotes);
  const mindMap = currentSnapNote?.mind_map;

  if (!mindMap) {
    return (
      <div className="text-center py-10">
        <p className="text-snap-text-muted">No mind map data available.</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-8 space-y-12 opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
      {/* Tree View Style Mind Map */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="px-8 py-4 rounded-2xl bg-primary/20 border-2 border-primary/40 text-snap-text-primary font-bold text-xl md:text-2xl shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)] mb-16 text-center"
        >
          {mindMap.main_topic}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {mindMap.branches.map((branch, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <div className="flex flex-col h-full bg-snap-bg-panel/40 border border-white/10 rounded-2xl p-6 group hover:border-primary/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-snap-cyan/10 flex items-center justify-center">
                    <Network className="w-5 h-5 text-snap-cyan" />
                  </div>
                  <h4 className="font-bold text-lg text-snap-text-primary">{branch.topic}</h4>
                </div>

                <ul className="space-y-2">
                  {branch.subtopics.map((sub, j) => (
                    <li key={j} className="flex items-center gap-2 text-snap-text-secondary text-sm">
                      <ArrowRight size={14} className="text-snap-text-muted shrink-0" />
                      <span>{sub}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-8 p-4 rounded-xl bg-snap-bg-panel/60 border border-white/5 text-center">
        <p className="text-[12px] text-snap-text-muted">
          Visual mind map representation of core topics and their relationships.
        </p>
      </div>
    </div>
  );
};

export default MindMapTab;
