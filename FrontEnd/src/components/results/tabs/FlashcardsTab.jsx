import { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { CardContainer, CardBody, CardItem } from "@/components/ui/ThreedCard";

const FlashcardsTab = () => {
  const { currentSnapNote } = useSelector((state) => state.snapNotes);
  const flashcards = currentSnapNote?.flashcards || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (flashcards.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-snap-text-muted">No flashcards available for this note.</p>
      </div>
    );
  }

  const currentCard = flashcards[currentIndex];

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : flashcards.length - 1));
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev < flashcards.length - 1 ? prev + 1 : 0));
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Progress indicators */}
      <motion.div className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        {flashcards.map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              "h-2 rounded-full transition-all",
              i === currentIndex ? "bg-primary w-6" : "bg-snap-bg-panel w-2"
            )}
            animate={{ width: i === currentIndex ? 24 : 8 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </motion.div>

      {/* 3D Flashcard Container */}
      <CardContainer containerClassName="w-full py-0" className="w-full max-w-lg aspect-4/3">
        <CardBody className="w-full h-full relative transform-3d">
          <motion.div
            className="relative w-full h-full cursor-pointer"
            initial={false}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
            style={{ transformStyle: "preserve-3d" }}
            onClick={handleFlip}
          >
            {/* Front Face (Question) */}
            <div
              className="absolute inset-0 glass-card-glow p-8 flex flex-col items-center justify-center text-center rounded-lg shadow-xl"
              style={{
                backfaceVisibility: "hidden",
                transform: "translateZ(1px)",
                transformStyle: "preserve-3d",
                WebkitBackfaceVisibility: "hidden"
              }}
            >
              <CardItem translateZ="50" className="text-small text-snap-text-muted mb-4 uppercase tracking-widest font-bold">
                Question
              </CardItem>
              <CardItem translateZ="100" as="h3" className="text-2xl md:text-3xl font-bold text-snap-text-primary px-4">
                {currentCard.front}
              </CardItem>
              <CardItem translateZ="60" className="text-[12px] text-snap-text-muted mt-6 flex items-center gap-2 opacity-60">
                <RotateCcw className="w-3 h-3" /> Click to reveal answer
              </CardItem>
            </div>

            {/* Back Face (Answer) */}
            <div
              className="absolute inset-0 glass-card p-8 flex flex-col items-center justify-center text-center bg-linear-to-br from-primary/10 to-snap-cyan/5 border-primary/30 rounded-lg shadow-xl"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg) translateZ(1px)",
                transformStyle: "preserve-3d",
                WebkitBackfaceVisibility: "hidden"
              }}
            >
              <CardItem translateZ="50" className="text-small text-snap-mint mb-4 uppercase tracking-widest font-bold">
                Answer
              </CardItem>
              <CardItem translateZ="100" as="p" className="text-lg md:text-xl text-snap-text-primary leading-relaxed px-4">
                {currentCard.back}
              </CardItem>
            </div>
          </motion.div>
        </CardBody>
      </CardContainer>

      {/* Navigation Controls */}
      <motion.div className="flex items-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <Button variant="outline-glow" size="icon" onClick={handlePrev} className="rounded-full">
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <Button variant="ghost" size="sm" onClick={() => setIsFlipped(false)} className="text-snap-text-muted hover:text-snap-text-primary">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset card
        </Button>

        <Button variant="outline-glow" size="icon" onClick={handleNext} className="rounded-full">
          <ChevronRight className="w-5 h-5" />
        </Button>
      </motion.div>

      <motion.p className="text-small text-snap-text-muted font-medium" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        Card {currentIndex + 1} of {flashcards.length}
      </motion.p>
    </div>
  );
};

export default FlashcardsTab;
