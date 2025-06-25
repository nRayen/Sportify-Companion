import { create } from 'zustand';
import { Suivi, SuiviInput, addSuiviAPI, getSuiviAPI } from '../api/suivi';

type SuiviStore = { 
    suivi: Suivi[];
    fetchSuivi: () => Promise<void>;
    addSuivi: (suivi: SuiviInput) => Promise<void>;
}

export const useSuiviStore = create<SuiviStore>((set) => ({
    suivi: [],
    fetchSuivi: async () => {
        const data = await getSuiviAPI();
        set({ suivi: data });
    },
    addSuivi: async (suivi: SuiviInput) => {
        const newSuivi = await addSuiviAPI({taille : suivi.taille, poids : suivi.poids});
        set((state) => ({
            suivi: [...state.suivi, newSuivi],
        }));
    },
}));