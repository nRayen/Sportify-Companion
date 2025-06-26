import { SafeArea } from "@/components/SafeArea";
import { Button, Text, View, YStack } from "tamagui";
import { useAuth } from "@/hooks/useAuth";
import { LogOut } from "@tamagui/lucide-icons";

export default function SettingsScreen() {
    const { logout } = useAuth();

    return (
        <SafeArea>
            <View flex={1} justify="center" items="center" p="$4">
                <YStack gap="$4" items="center">
                    <Text fontSize="$6" fontWeight="600">Paramètres</Text>
                    
                    <Button
                        size="$4"
                        onPress={() => {
                            logout();
                        }}
                    >
                        <Button.Icon>
                            <LogOut />
                        </Button.Icon>
                        <Text fontWeight="600">Se déconnecter</Text>
                    </Button>
                </YStack>
            </View>
        </SafeArea>
    );
}
