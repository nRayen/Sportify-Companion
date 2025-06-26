import { create } from "zustand";
import { addSeanceAPI, deleteSeanceAPI, getSeancesAPI, Seances } from "../api/seances";

type SeancesStore = {
    seances: Seances[];
    fetchSeances: () => Promise<void>;
    deleteSeance: (id: number) => Promise<void>;
}

export const useSeancesStore = create<SeancesStore>((set) => ({
    seances: [],

    fetchSeances: async () => {
        const seances = await getSeancesAPI();
        set({ seances });
    },

    deleteSeance: async (id: number) => {
        await deleteSeanceAPI(id);
        set((state) => ({ seances: state.seances.filter((seance) => seance.id !== id) }));
    },
}));
