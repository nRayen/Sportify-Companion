import { SafeArea } from "@/components/SafeArea";
import { Button, Text, View } from "tamagui";
import { useAuth } from "@/hooks/useAuth";
import { LogOut } from "@tamagui/lucide-icons";

export default function SettingsScreen() {
    const { logout } = useAuth();
    return (
        <View>
            <Button onPress={() => {
                logout();
            }}>
                <Button.Icon>
                    <LogOut />
                </Button.Icon>
                <Text>Logout</Text>
            </Button>
        </View>
    )
}
