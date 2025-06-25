import { getAuthCookies } from "../authCookies";

export type Suivi = {
    id: number;
    height: number;
    weight: number;
    created_at: string;
    id_user: number;
}

export type SuiviInput = {
    taille: number;
    poids: number;
}

export const getSuiviAPI = async (): Promise<Suivi[]> => {
    const token = await getAuthCookies();
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/physical-data`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const suivi = await response.json();
    return suivi;
}

export const addSuiviAPI = async (suivi: SuiviInput): Promise<Suivi> => {
    console.log(suivi);
    const token = await getAuthCookies();
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/physical-data`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(suivi)
    });
    const newSuivi = await response.json();
    if (response.ok) {
        return newSuivi;
    } else {
        throw new Error(newSuivi.error);
    }
}