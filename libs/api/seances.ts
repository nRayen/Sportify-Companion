import { getAuthCookies } from "../authCookies";
import { Exercice } from "./exercices";

export type Seances = {
    id: number;
    id_user: number;
    title: string;
    date: string;
    duration: number;
    objective: string;
    exerciceStats: ExerciceStats[];
}

export type ExerciceStats = {
    id: number;
    id_exercice: number;
    id_seance: number;
    reps: number;
    weight: number;
    sets: number;
}

export type ExerciceStatsInput = Omit<ExerciceStats, 'id' | 'id_seance' | 'id_exercice'>;
export type SeancesInput = Omit<Seances, 'id'> & { exerciceStats: ExerciceStatsInput[] };

export const getSeancesAPI = async (): Promise<Seances[]> => {
    const token = await getAuthCookies();
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/seances`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const seances = await response.json();
    return seances;
}

export const addSeanceAPI = async (seance: SeancesInput): Promise<void> => {
    const token = await getAuthCookies();
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/seances`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(seance)
    });
    if (!response.ok) {
        throw new Error("Failed to add seance");
    }
}

export const deleteSeanceAPI = async (id: number): Promise<void> => {
    const token = await getAuthCookies();
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/seances/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error("Failed to delete seance");
    }
}


