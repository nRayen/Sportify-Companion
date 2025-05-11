import { SafeArea } from "@/components/SafeArea";
import { InputWithIcon } from "@/components/ui/InputWithIcon";
import PasswordInput from "@/components/ui/PasswordInput";
import { useAuth } from "@/hooks/useAuth";
import { ChevronRight, MailCheck, User } from "@tamagui/lucide-icons";
import { Link, Redirect, useRouter } from "expo-router";
import { ArrowRight, Mail } from "@tamagui/lucide-icons";
import { useState } from "react";
import { Button, Heading, YStack } from "tamagui";

export default function Index() {
    const [showPassword, setShowPassword] = useState(false);
    const { isAuthenticated } = useAuth();

    if (isAuthenticated()) {
        return <Redirect href="/(auth)/(tabs)/home" />;
    }

    const router = useRouter();

    
    return (
        <SafeArea>
            <YStack height="100%" justify="space-between">
                <Heading color="$color" text="center">Bienvenue sur Sportify</Heading>

                <YStack gap={10} mt={"auto"} height={"min-content"}>
                    <Button theme="accent" onPress={() => router.push("/login")} fontSize={18} size={"$5"}>
                        Connexion
                        <Button.Icon>
                            <ChevronRight size={20} />
                        </Button.Icon>
                    </Button>
                    <Button onPress={() => router.push("/register")} borderColor="$accent" fontSize={18} borderWidth={2} bg={"$background0"} size={"$5"}>
                        Inscription
                        <Button.Icon>
                            <ChevronRight size={20} />
                        </Button.Icon>
                    </Button>
                </YStack>
            </YStack>
        </SafeArea>
    );
}
