import { getAuthCookies } from "../authCookies";

export type User = {
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    birthday: string;
    sex: string;
}

export const getUserAPI = async () : Promise<User> => {
    const token = await getAuthCookies();

    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/user`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const user = await response.json();
    return user;
}
