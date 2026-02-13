import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Sparkles, Calendar, BookOpen, ChevronRight, Search } from "lucide-react";

const MotionLink = motion(Link);

const MySnapNotes = () => {
    const { snapNotes } = useSelector((state) => state.snapNotes);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    if (!snapNotes || snapNotes.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-20 h-20 rounded-2xl bg-snap-cyan/10 flex items-center justify-center mb-6"
                >
                    <BookOpen className="w-10 h-10 text-snap-cyan" />
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-bold text-snap-text-primary mb-2">No SnapNotes Yet</h2>
                <p className="text-snap-text-secondary max-w-md">
                    Upload your study materials in the dashboard to generate AI-powered insights, flashcards, and summaries.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-snap-text-primary tracking-tight mb-2">
                        My <span className="text-snap-cyan">SnapNotes</span>
                    </h1>
                    <p className="text-snap-text-secondary text-lg">
                        Review and master your generated study materials.
                    </p>
                </div>

                <div className="relative group max-w-sm w-full">
                    <div className="absolute inset-0 bg-snap-cyan/5 blur-xl group-focus-within:bg-snap-cyan/10 transition-all duration-300 rounded-full" />
                    <div className="relative flex items-center bg-snap-bg-panel/40 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 text-snap-text-muted focus-within:border-snap-cyan/30 focus-within:text-snap-text-primary transition-all duration-300">
                        <Search size={18} className="mr-2" />
                        <input
                            type="text"
                            placeholder="Search topics..."
                            className="bg-transparent border-none outline-none w-full text-sm"
                        />
                    </div>
                </div>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {snapNotes.map((note, index) => (
                    <MotionLink
                        key={note._id || index}
                        to="/dashboard/snapnotes/$noteId"
                        params={{ noteId: note._id || index }}
                        variants={itemVariants}
                        className="group relative h-full flex flex-col"
                    >
                        {/* Glossy Background Effect */}
                        <div className="absolute -inset-0.5 bg-linear-to-br from-snap-cyan via-snap-purple to-snap-pink rounded-3xl opacity-0 group-hover:opacity-20 blur transition duration-500" />

                        <div className="relative flex-1 bg-snap-bg-panel/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden glass-card-glow flex flex-col hover:border-white/20 transition-all duration-300 hover:translate-y-[-4px]">

                            {/* Header Image */}
                            <div className="relative h-48 overflow-hidden bg-snap-bg-panel/60">
                                {note.imageUrl ? (
                                    <img
                                        src={note.imageUrl}
                                        alt={note.topic || "Study Note"}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-snap-cyan/5">
                                        <Sparkles className="w-12 h-12 text-snap-cyan/20" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-linear-to-t from-snap-bg-dark/80 to-transparent opacity-60" />

                                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                                    <div className="px-3 py-1 rounded-full bg-snap-cyan/20 backdrop-blur-md border border-snap-cyan/30 text-[10px] font-bold text-snap-cyan uppercase tracking-wider">
                                        {note.type || "Summary"}
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center gap-2 text-xs text-snap-text-muted mb-3">
                                    <Calendar size={14} />
                                    <span>{new Date(note.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                </div>

                                <h3 className="text-xl font-bold text-snap-text-primary mb-3 leading-tight group-hover:text-snap-cyan transition-colors">
                                    {note.topic || "Untitled Topic"}
                                </h3>

                                <p className="text-snap-text-secondary text-sm leading-relaxed mb-6">
                                    {note.snapNotes || note.summary || "No summary available for this note. Please try regenerating the content to get AI-powered insights."}
                                </p>

                                <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
                                    <div className="flex items-center gap-2 text-[10px] font-medium text-snap-text-muted uppercase tracking-widest">
                                        <BookOpen size={12} className="text-snap-purple" />
                                        <span>Resource</span>
                                    </div>

                                    <button className="flex items-center gap-1 text-sm font-semibold text-snap-cyan group/btn">
                                        View Details
                                        <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </MotionLink>
                ))}
            </motion.div>

            {/* Stats/Footer Decoration */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-20 pt-10 border-t border-white/5 flex flex-col items-center gap-6"
            >
                <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-snap-purple/10 border border-snap-purple/20 text-xs font-medium text-snap-purple">
                    <Sparkles size={14} />
                    <span>Total SnapNotes: {snapNotes.length}</span>
                </div>
            </motion.div>
        </div>
    );
};

export default MySnapNotes