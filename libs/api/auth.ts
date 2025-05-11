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

export const registerUser = async (
    firstname: string, 
    lastname: string, 
    pseudo: string, 
    email: string, 
    password: string,
    birthday?: string,
    sex?: string,
) : Promise<void> => {
    const baseUrl = process.env.EXPO_PUBLIC_API_URL;
    const response = await fetch(`${baseUrl}/auth/register`, {
    // const response = await fetch(`http://localhost:3000/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            firstname, 
            lastname, 
            pseudo, 
            email, 
            password,
            birthday,
            sex
        })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
        if (data.code === 409) {
            throw new Error("Ce nom d'utilisateur ou email est déjà utilisé");
        } else if(data.code === 400) {
            console.log(data);
            throw new Error("Les champs sont invalides");
        } else if (data.message) {
            throw new Error(data.message);
        } else {
            throw new Error("Erreur lors de l'inscription");
        }
    }
}
