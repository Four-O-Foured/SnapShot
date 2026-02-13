import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    snapNotes: [],
    currentSnapNote: null,
};

const snapNotesSlice = createSlice({
    name: 'snapNotes',
    initialState,
    reducers: {
        setSnapNotes: (state, action) => {
            state.snapNotes = action.payload;
        },
        addSnapNote: (state, action) => {
            state.snapNotes.unshift(action.payload);
        },
        setCurrentSnapNote: (state, action) => {
            state.currentSnapNote = action.payload;
        },
        clearCurrentSnapNote: (state) => {
            state.currentSnapNote = null;
        },
    },
});

export const { setSnapNotes, addSnapNote, setCurrentSnapNote, clearCurrentSnapNote, clearSnapNotes } = snapNotesSlice.actions;
export default snapNotesSlice.reducer;
