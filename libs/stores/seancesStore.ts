import { create } from "zustand";
import { addSeanceAPI, deleteSeanceAPI, getSeancesAPI, Seances } from "../api/seances";

type SeancesStore = {
    seances: Seances[];
    fetchSeances: () => Promise<void>;
    addSeance: (seance: Seances) => Promise<void>;
    deleteSeance: (id: number) => Promise<void>;
}

export const useSeancesStore = create<SeancesStore>((set) => ({
    seances: [],

    fetchSeances: async () => {
        const seances = await getSeancesAPI();
        set({ seances });
    },

    addSeance: async (seance: Seances) => {
        await addSeanceAPI(seance);
        set((state) => ({ seances: [...state.seances, seance] }));
    },

    deleteSeance: async (id: number) => {
        await deleteSeanceAPI(id);
        set((state) => ({ seances: state.seances.filter((seance) => seance.id !== id) }));
    },
}));
