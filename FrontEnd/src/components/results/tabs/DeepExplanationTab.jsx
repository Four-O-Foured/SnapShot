import { useSelector } from "react-redux";

const DeepExplanationTab = () => {
  const { currentSnapNote } = useSelector((state) => state.snapNotes);

  const title = currentSnapNote?.lesson_title || "Deep Explanation";
  const explanations = currentSnapNote?.snapNotes?.step_by_step_explanation || [];

  if (explanations.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-snap-text-muted">No explanations available for this section.</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-8 space-y-6 opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
      <div className="space-y-4">
        <h3 className="text-h3 text-snap-text-primary">{title}</h3>

        <p className="text-body text-snap-text-secondary leading-relaxed">
          This detailed breakdown provides a step-by-step understanding of the core concepts covered in your materials.
        </p>
      </div>

      <div className="space-y-4">
        <h4 className="text-body font-semibold text-snap-text-primary">The Process Breakdown</h4>

        <ul className="space-y-4">
          {explanations.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-body text-snap-text-secondary leading-relaxed">
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-primary text-sm font-bold">{i + 1}</span>
              </span>
              <div className="pt-1">
                {item}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {currentSnapNote?.diagram_explanations?.length > 0 && (
        <div className="p-4 rounded-xl bg-snap-bg-panel border border-border/50">
          <p className="text-small text-snap-text-muted italic">
            💡 <span className="text-snap-gold font-bold">Additional Context:</span> {currentSnapNote.diagram_explanations[0]}
          </p>
        </div>
      )}
    </div>
  );
};

export default DeepExplanationTab;
