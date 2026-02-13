import { useEffect } from "react";
import { useParams } from "@tanstack/react-router";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import ResultsTabs from "../components/results/ResultsTabs";
import { setCurrentSnapNote } from "../store/slices/snapNotesSlice";
import { useState } from "react";

const SnapNoteDetailsPage = () => {
    const {CurrentSnapNote} = useSelector((state) => state.snapNotes);
    console.log(CurrentSnapNote);
    const [selectedNote, setSelectedNote] = useState(null);
    if (!CurrentSnapNote) {
        const { noteId } = useParams({ from: '/dashboard/snapnotes/$noteId' });
        const dispatch = useDispatch();
        const { snapNotes } = useSelector((state) => state.snapNotes);

        // Find the specific note
        setSelectedNote(snapNotes.find(note => (note._id || note.id) == noteId));

        useEffect(() => {
            if (selectedNote) {
                dispatch(setCurrentSnapNote(selectedNote));
            }
        }, [selectedNote]);
    }

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
                    {selectedNote.topic || "Study Insights"}
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
