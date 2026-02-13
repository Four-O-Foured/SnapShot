import { useMutation } from '@tanstack/react-query';
import api from '../api/axios';
import { showToast } from '../lib/toast';
import { useDispatch } from 'react-redux';
import { addSnapNote, setCurrentSnapNote } from '../store/slices/snapNotesSlice';
import { useNavigate } from '@tanstack/react-router';


export const useCreateSnapNote = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (data) => {
            const formData = new FormData();
            formData.append("image", data.file);
            if (data.userPreference) {
                formData.append("userPreference", data.userPreference);
            }

            const response = await api.post('/snap/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        },
        onSuccess: (data) => {
            showToast.success('SnapNote created successfully!');
            console.log(data);

            // Update Redux state
            dispatch(addSnapNote(data.snapNotes));
            dispatch(setCurrentSnapNote(data.snapNotes));

            // Navigate to results
            navigate({ to: `/dashboard/snapnotes/${data.snapNotes._id}`});

            return data;
        },
        onError: (error) => {
            const message = error.response?.data?.message || 'Failed to create SnapNote';
            showToast.error(message);
        },
    });
};
