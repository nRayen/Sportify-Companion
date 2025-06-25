import { useEffect, useState } from "react";
import { H2, H3, H4, Text, View, YStack, XStack, Card, Paragraph, Button } from "tamagui";
import { useSuiviStore } from "@/libs/stores/suiviStore";
import { ActivityIndicator } from "react-native";
import { User, Weight, Activity, Scale, Ruler, Plus } from '@tamagui/lucide-icons';
import { Link } from "expo-router";

export default function SuiviScreen() {

    const [isLoading, setIsLoading] = useState(false);
    const { suivi, fetchSuivi, addSuivi } = useSuiviStore();

    useEffect(() => {
        try {
            const loadSuivi = async () => {
                setIsLoading(true);
                await fetchSuivi();
                setIsLoading(false);
            }
            loadSuivi();
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }, []);

    // Get the last entry (most recent)
    const lastEntry = suivi.length > 0 ? suivi[suivi.length - 1] : null;

    // Calculate BMI if we have height and weight
    const calculateBMI = (weight: number, height: number) => {
        const heightInMeters = height / 100; // Convert cm to meters
        const bmi = weight / (heightInMeters * heightInMeters);
        return bmi.toFixed(1);
    };

    // Get BMI category
    const getBMICategory = (bmi: number) => {
        if (bmi < 18.5) return { category: "Sous-poids", color: "$blue9" };
        if (bmi < 25) return { category: "Poids normal", color: "$green9" };
        if (bmi < 30) return { category: "Surpoids", color: "$orange9" };
        return { category: "Obésité", color: "$red9" };
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <View p={12} flex={1}>            
            <Link href="/(auth)/(modals)/addSuivi" asChild>
                <Button theme={"accent"} mb={16}>
                    <Button.Icon>
                        <Plus />
                    </Button.Icon>
                    <Button.Text>Ajouter une mesure</Button.Text>
                </Button>
            </Link>
            
            {isLoading ? (
                <ActivityIndicator size="large" color="$accent" />
            ) : lastEntry ? (
                <Card 
                    p={20} 
                    bordered
                    borderRadius={16}
                    backgroundColor="$background"
                    borderColor="$borderColor"
                    shadowColor="$shadowColor"
                    shadowOffset={{ width: 0, height: 4 }}
                    shadowOpacity={0.15}
                    shadowRadius={8}
                    elevation={4}
                >
                    <YStack gap={16}>
                        <XStack items="center" gap={8} mb={8}>
                            <Activity size={20} color="$color" />
                            <H3 color="$color">Dernière mesure</H3>
                        </XStack>

                        <Paragraph size="$2" color="$color11" mb={12}>
                            {formatDate(lastEntry.created_at)}
                        </Paragraph>

                        <XStack justify="space-between" gap={16}>
                            {/* Height */}
                            <Card flex={1} p={16} backgroundColor="$background" borderRadius={12}>
                                <YStack items="center" gap={8}>
                                    <Ruler size={24} color="$accent" />
                                    <Text fontSize="$6" fontWeight="600" color="$color">
                                        {lastEntry.height}
                                    </Text>
                                    <Text fontSize="$2" color="$color11">cm</Text>
                                    <Text fontSize="$1" color="$color11">Taille</Text>
                                </YStack>
                            </Card>

                            {/* Weight */}
                            <Card flex={1} p={16} backgroundColor="$background" borderRadius={12}>
                                <YStack items="center" gap={8}>
                                    <Scale size={24} color="$accent" />
                                    <Text fontSize="$6" fontWeight="600" color="$color">
                                        {lastEntry.weight}
                                    </Text>
                                    <Text fontSize="$2" color="$color11">kg</Text>
                                    <Text fontSize="$1" color="$color11">Poids</Text>
                                </YStack>
                            </Card>
                        </XStack>

                        {/* BMI */}
                        <Card 
                            p={16} 
                            backgroundColor="$background" 
                            borderRadius={12}
                            mt={8}
                        >
                            <YStack items="center" gap={8}>
                                <H4 color="$color">IMC</H4>
                                <Ruler size={24} color="$accent" />
                                <Text fontSize="$1" color="$color11">IMC</Text>
                                <Text fontSize="$8" fontWeight="bold" color="$color">
                                    {calculateBMI(lastEntry.weight, lastEntry.height)}
                                </Text>
                                <Text 
                                    fontSize="$3" 
                                    fontWeight="500"
                                    // color={getBMICategory(parseFloat(calculateBMI(lastEntry.weight, lastEntry.height))).color}
                                >
                                    {getBMICategory(parseFloat(calculateBMI(lastEntry.weight, lastEntry.height))).category}
                                </Text>
                            </YStack>
                        </Card>
                    </YStack>
                </Card>
            ) : (
                <Card p={20} items="center" backgroundColor="$background" borderRadius={12}>
                    <Text color="$accent">Aucune donnée disponible</Text>
                </Card>
            )}

            
        </View>
    )
}

