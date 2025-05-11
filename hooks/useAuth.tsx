import { checkLogin, registerUser } from "@/libs/api/auth";
import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { useRouter } from "expo-router";

type AuthContextType = {
    login: (username: string, password: string) => Promise<void>;
    register: (firstName: string, lastName: string, username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    getSessionToken: () => string | null;
    isAuthenticated: () => boolean;
    isLoading: boolean;
};


export const AuthContext = createContext<AuthContextType>({
    login: async (username : string, password : string) => {},
    register: async (firstname: string, lastname: string, pseudo: string, email: string, password: string) => {},
    logout: () => {},
    getSessionToken: () => null,
    isAuthenticated: () => false,
    isLoading: true
});

export const AuthProvider = ({ children } : { children : React.ReactNode }) => {
    const [sessionToken, setSessionToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Récupérer le token de session au démarrage de l'application
    useEffect(() => {
        const getSessionToken = async () => {
            try {
                const token = await SecureStore.getItemAsync('jwt');
                if (token) {
                    setSessionToken(token);
                }
            } catch (error) {
                console.error("Error retrieving auth token:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getSessionToken();
    }, []);

    // Fonction pour se connecter
    const login = async (username : string, password : string) : Promise<void> => {
        try {
            const sessionToken : string = await checkLogin(username, password);
            if (sessionToken) {
                await SecureStore.setItemAsync('jwt', sessionToken);
                setSessionToken(sessionToken);
                router.replace('/(auth)/(tabs)/home');
            }
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    };

    // Fonction pour s'inscrire
    const register = async (
        firstname: string, 
        lastname: string, 
        pseudo: string, 
        email: string, 
        password: string
    ) : Promise<void> => {
        try {
            await registerUser(firstname, lastname, pseudo, email, password);
            // Successful registration, but user still needs to login
        } catch (error) {
            console.error("Error registering:", error);
            throw error;
        }
    };

    // Fonction pour se déconnecter
    const logout = async () : Promise<void> => {
        await SecureStore.deleteItemAsync('jwt');
        setSessionToken(null);
        router.replace('/');
    };


    // Fonction pour récupérer le token de session
    const getSessionToken = () : string | null => {
        return sessionToken;
    };


    // Fonction pour vérifier si l'utilisateur est authentifié
    const isAuthenticated = () : boolean => {
        return sessionToken !== null;
    };

    return (
        <AuthContext.Provider value={{  
            login, 
            register,
            logout, 
            getSessionToken, 
            isAuthenticated,
            isLoading
        }}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}
