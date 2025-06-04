import { create } from 'zustand';
import { getPersonalExercicesAPI, addExerciseAPI, Exercice, getPublicExercicesAPI, deleteExerciseAPI, ExerciceInput } from '../api/exercices';

type ExerciseStore = {
  personalExercises: Exercice[];
  publicExercises: Exercice[];
  fetchPersonalExercises: () => Promise<void>;
  fetchPublicExercises: () => Promise<void>;
  addExercise: (exercice: ExerciceInput) => Promise<void>;
  deleteExercise: (id: number) => Promise<void>;
};

export const useExerciseStore = create<ExerciseStore>((set) => ({
  personalExercises: [],
  publicExercises: [],

  fetchPersonalExercises: async () => {
    const data = await getPersonalExercicesAPI();
    set({ personalExercises: data });
  },

  fetchPublicExercises: async () => {
    const data = await getPublicExercicesAPI();
    set({ publicExercises: data });
  },

  addExercise: async (exercice: ExerciceInput) => {
    const newExercise = await addExerciseAPI(exercice);
    set((state) => ({
      personalExercises: [...state.personalExercises, newExercise],
    }));
  },

  deleteExercise: async (id: number) => {
    await deleteExerciseAPI(id);
    set((state) => ({
      personalExercises: state.personalExercises.filter((exercise) => exercise.id !== id),
    }));
  },
}));

