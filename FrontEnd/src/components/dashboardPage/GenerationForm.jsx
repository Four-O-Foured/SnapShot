import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Upload, Image, X, Loader2, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import RHFFileDrop from "@/components/layout/RHFFileDrop";
import { showToast } from "@/lib/toast";
import { useCreateSnapNote } from "../../hooks/useSnapNotes";
import { useDispatch } from "react-redux";
import { clearCurrentSnapNote } from "../../store/slices/snapNotesSlice";


const GenerationForm = () => {
    const { control, handleSubmit, watch, setValue, reset } = useForm({
        defaultValues: {
            file: null,
            userPreference: ""
        }
    });
    const dispatch = useDispatch();
    const { mutate, isPending } = useCreateSnapNote();

    const file = watch("file");
    const userPreference = watch("userPreference");
    const textareaRef = useRef(null);

    // Auto-resize textarea
    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
        }
    };

    useEffect(() => {
        adjustHeight();
    }, [userPreference]);

    useEffect(() => {
        dispatch(clearCurrentSnapNote());
    }, []);

    const handleFormSubmit = (data) => {
        if (!data.file) {
            showToast.error("Please upload a file to start generating.");
            return;
        }

        if (!isPending) {
            console.log(data);
            mutate(data);
            reset();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(handleFormSubmit)();
        }
    };

    // Processing View
    if (isPending) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-2xl mx-auto text-center space-y-8 py-12"
            >
                <div className="relative w-32 h-32 mx-auto">
                    {/* Pulsing rings */}
                    <div className="absolute inset-0 rounded-full border-4 border-snap-cyan/30 animate-[ping_3s_ease-in-out_infinite]" />
                    <div className="absolute inset-0 rounded-full border-4 border-snap-purple/20 animate-[ping_3s_ease-in-out_infinite_0.5s]" />

                    {/* Center Icon */}
                    <div className="relative w-full h-full rounded-full bg-snap-bg-panel/50 backdrop-blur-xl border border-snap-cyan/30 flex items-center justify-center shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)]">
                        <Sparkles className="w-12 h-12 text-snap-cyan animate-pulse" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-snap-cyan via-snap-purple to-snap-pink animate-pulse">
                        Generating Magic...
                    </h3>
                    <p className="text-snap-text-secondary text-lg">
                        Analyzing your notes and crafting study materials.
                    </p>
                </div>

                {/* Progress Steps (Visual only for now) */}
                <div className="flex justify-center gap-2 pt-4">
                    <div className="w-2 h-2 rounded-full bg-snap-cyan animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-2 h-2 rounded-full bg-snap-purple animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2 h-2 rounded-full bg-snap-pink animate-bounce" />
                </div>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full max-w-4xl mx-auto space-y-8">
            {/* File Upload Section */}
            <RHFFileDrop name="file" control={control}>
                {({ isDragging, preview, file, removeFile, triggerBrowser }) => (
                    <div className="w-full">
                        <AnimatePresence mode="wait">
                            {preview ? (
                                <motion.div
                                    key="preview"
                                    className="glass-card-glow p-4 sm:p-6 md:p-8 w-full relative"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.button
                                        type="button"
                                        onClick={() => removeFile()}
                                        className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-snap-bg-panel border border-border flex items-center justify-center text-snap-text-muted hover:text-snap-text-primary transition-colors z-10"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <X className="w-4 h-4" />
                                    </motion.button>

                                    <div className="w-full h-48 sm:h-64 md:h-72 rounded-lg overflow-hidden bg-snap-bg-panel mb-4">
                                        <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                                    </div>

                                    <div className="flex items-center gap-3 bg-snap-bg-panel/50 px-4 py-2 rounded-full border border-white/5 w-fit mx-auto">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <Image className="w-4 h-4 text-primary" />
                                        </div>
                                        <p className="text-sm text-snap-text-primary font-medium truncate max-w-[200px]">
                                            {file?.name || "Uploaded Image"}
                                        </p>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="dropzone"
                                    className={cn(
                                        "upload-zone p-4 sm:p-8 md:p-10 lg:p-12 text-center cursor-pointer group w-full",
                                        isDragging && "border-primary bg-primary/5"
                                    )}
                                    onClick={triggerBrowser}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <div className="flex flex-col items-center gap-4 sm:gap-6 w-full">
                                        <motion.div
                                            className="w-16 md:w-20 h-16 md:h-20 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0"
                                            whileHover={{ scale: 1.15, rotate: 5 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Upload className="w-8 md:w-10 h-8 md:h-10 text-primary" />
                                        </motion.div>

                                        <div className="space-y-2 px-1 text-center w-full">
                                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-snap-text-primary leading-tight">
                                                Drop your notes here
                                            </h3>
                                            <p className="text-xs sm:text-base text-snap-text-secondary mx-auto max-w-[240px] sm:max-w-md">
                                                Supports handwritten notes, slides, and textbook pages
                                            </p>
                                        </div>

                                        <Button
                                            variant="outline-glow"
                                            size="lg"
                                            className="w-full sm:w-auto mt-2"
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                triggerBrowser();
                                            }}
                                        >
                                            Browse Files
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </RHFFileDrop>

            {/* userPreference Input Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-full max-w-3xl mx-auto relative group"
            >
                <div className="absolute -inset-1 bg-linear-to-r from-snap-cyan via-snap-purple to-snap-pink rounded-[2.5rem] opacity-20 group-hover:opacity-40 blur transition duration-500"></div>

                <div className="relative flex items-end gap-2 p-2 pl-6 bg-snap-bg-panel/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-xl transition-all duration-300 focus-within:border-snap-cyan/30 focus-within:bg-snap-bg-panel/80">
                    <div className="pb-3 text-snap-cyan animate-pulse">
                        <Sparkles size={20} />
                    </div>

                    <textarea
                        ref={textareaRef}
                        value={userPreference || ""}
                        onChange={(e) => setValue("userPreference", e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type custom preferences here (optional) (e.g. make it more concise, add more examples, explain for 8th grader, etc.)"
                        className="w-full bg-transparent flex items-end border-none outline-none focus:ring-0 text-snap-text-primary placeholder:text-snap-text-muted/70 resize-none py-3 max-h-[200px] min-h-[50px] scrollbar-hide"
                        rows={1}
                        disabled={isPending}
                    />

                    <button
                        type="submit"
                        disabled={(!userPreference && !file) || isPending}
                        className="p-3 mb-1 rounded-full bg-snap-cyan/10 text-snap-cyan hover:bg-snap-cyan hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group-submit"
                    >
                        {isPending ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <Send size={20} className="ml-0.5 group-submit-hover:translate-x-0.5 transition-transform" />
                        )}
                    </button>
                </div>
            </motion.div>
        </form>
    );
};

export default GenerationForm;
