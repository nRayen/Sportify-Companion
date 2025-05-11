import { SafeAreaView } from "react-native-safe-area-context";

export const SafeArea = ({ children }: { children: React.ReactNode }) => {
    return <SafeAreaView style={{ flex: 1, padding: 16 }}>{children}</SafeAreaView>;
};


