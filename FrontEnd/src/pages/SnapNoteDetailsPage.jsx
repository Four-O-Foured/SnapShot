import { useEffect } from "react";
import { useParams } from "@tanstack/react-router";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import ResultsTabs from "../components/results/ResultsTabs";
import { setCurrentSnapNote } from "../store/slices/snapNotesSlice";

const SnapNoteDetailsPage = () => {
    const { noteId } = useParams({ from: '/dashboard/snapnotes/$noteId' });
    const dispatch = useDispatch();

    // Select state with standard casing
    const { snapNotes, currentSnapNote } = useSelector((state) => state.snapNotes);

    // Find the specific note from the full list based on the URL parameter
    const selectedNote = snapNotes.find(note => (note._id || note.id) == noteId);

    // Sync currentSnapNote if needed (e.g. on direct navigation/refresh)
    useEffect(() => {
        if (selectedNote && (!currentSnapNote || (currentSnapNote._id || currentSnapNote.id) !== noteId)) {
            dispatch(setCurrentSnapNote(selectedNote));
        }
    }, [selectedNote, currentSnapNote, dispatch, noteId]);

    if (!selectedNote) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <h2 className="text-2xl font-bold text-snap-text-primary mb-4">SnapNote Not Found</h2>
                <p className="text-snap-text-secondary">We couldn't find the note you're looking for.</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
        >
            <div className="text-center space-y-2">
                <h1 className="text-3xl md:text-5xl font-bold text-snap-text-primary tracking-tight">
                    {selectedNote.lesson_title || selectedNote.topic || "Study Insights"}
                </h1>
                <p className="text-snap-text-secondary">
                    Detailed AI analysis and study materials for this topic.
                </p>
            </div>

            <ResultsTabs />
        </motion.div>
    );
};

export default SnapNoteDetailsPage;
