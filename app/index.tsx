import { useAuth } from "@/hooks/useAuth";
import { Link, Redirect, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Heading, Text } from "tamagui";

export default function Index() {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated()) {
        return <Redirect href="/(auth)/(tabs)/home" />;
    }

    const router = useRouter();

    
    return (
        <SafeAreaView>
            <Heading color="red">Index</Heading>

            <Button onPress={() => router.push("/login")}>
                Connexion
            </Button>
            <Button onPress={() => router.push("/register")}>
                Inscription
            </Button>
        </SafeAreaView>
    );
}
