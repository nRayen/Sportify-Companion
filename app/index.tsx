import { SafeArea } from "@/components/SafeArea";
import { useAuth } from "@/hooks/useAuth";
import { Link, Redirect, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Heading, Text, Theme } from "tamagui";

export default function Index() {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated()) {
        return <Redirect href="/(auth)/(tabs)/home" />;
    }

    const router = useRouter();

    
    return (
        <SafeArea>
            <Heading color="$color">Index</Heading>

                
                <Button theme="accent" onPress={() => router.push("/login")}>
                    Connexion
                </Button>
                <Button theme="accent" onPress={() => router.push("/register")}>
                    Inscription
                </Button>
        </SafeArea>
    );
}
