import { checkLogin } from "@/libs/api/auth";
import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { useRouter } from "expo-router";

type AuthContextType = {
    sessionToken: string | null;
    login: (username: string, password: string) => void;
    logout: () => void;
    getSessionToken: () => string | null;
    isAuthenticated: () => boolean;
};

const router = useRouter();

export const AuthContext = createContext<AuthContextType>({
    sessionToken: null,
    login: (username : string, password : string) => {},
    logout: () => {},
    getSessionToken: () => null,
    isAuthenticated: () => false
});

export const AuthProvider = ({ children } : { children : React.ReactNode }) => {
    const [sessionToken, setSessionToken] = useState<string | null>(null);

    // Récupérer le token de session au démarrage de l'application
    useEffect(() => {
        const getSessionToken = async () => {
            const sessionToken = await SecureStore.getItemAsync('jwt');
            if (sessionToken) {
                setSessionToken(sessionToken);
                router.replace('/(auth)/(tabs)/home');
            }
        };
        getSessionToken();
    }, []);

    // Fonction pour se connecter
    const login = async (username : string, password : string) : Promise<void> => {
        const sessionToken : string = await checkLogin(username, password);
        if (sessionToken) {
            await SecureStore.setItemAsync('jwt', sessionToken);
            setSessionToken(sessionToken);
            router.replace('/(auth)/(tabs)/home');
        }
    };


    // Fonction pour se déconnecter
    const logout = async () : Promise<void> => {
        await SecureStore.deleteItemAsync('jwt');
        setSessionToken(null);
        router.replace('/login');
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
        <AuthContext.Provider value={{ sessionToken, login, logout, getSessionToken, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}
