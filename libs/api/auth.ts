export const checkLogin = async (username : string, password : string) : Promise<string> =>  {
        const baseUrl = process.env.EXPO_PUBLIC_API_URL;
        const response = await fetch(`${baseUrl}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userLogin: username, password })
        });
        const data = await response.json();
        if (response.ok) {
            return data.token;
        } else {
            if (data.code === 401) {
                throw new Error("Identifiants incorrects");
            } else {
                throw new Error("Erreur lors de la connexion");
            }
        }

}
