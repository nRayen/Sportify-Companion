import { getAuthCookies } from "../authCookies";

export interface Exercice {
    id: number;
    title: string;
    description: string;
    public: boolean;
}

export const getPersonalExercicesAPI = async (): Promise<Exercice[]> => {
    const token = await getAuthCookies();
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/exercices/personal`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const exercices = await response.json();
    return exercices;
}

export const getPublicExercicesAPI = async (): Promise<Exercice[]> => {
    const token = await getAuthCookies();
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/exercices/public`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const exercices = await response.json();
    return exercices;
}

export const addExerciseAPI = async (title: string, description: string, isPublic: boolean): Promise<Exercice> => {
    const token = await getAuthCookies();
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/exercices`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            title,
            description,
            public: isPublic
        })
    });
    const exercice = await response.json();
    if (response.ok) {
        return exercice;
    } else {
        throw new Error(exercice.message);
    }
}


export const deleteExerciseAPI = async (id: number): Promise<void> => {
    const token = await getAuthCookies();
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/exercices/${id}`, {
        method: "DELETE",
        headers: { 
            "Authorization": `Bearer ${token}`
        }
    });
    if (response.ok) {
        return;
    } else {
        throw new Error("Failed to delete exercise");
    }
}
