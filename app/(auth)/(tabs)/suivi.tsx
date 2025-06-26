import { useEffect, useState } from "react";
import { H5, Text, View, YStack, XStack, Card, Button, ScrollView } from "tamagui";
import { useSuiviStore } from "@/libs/stores/suiviStore";
import { ActivityIndicator } from "react-native";
import { Activity, Scale, Ruler, Plus, TrendingUp, Calendar, BarChart3 } from '@tamagui/lucide-icons';
import { Link } from "expo-router";

export default function SuiviScreen() {

    const [isLoading, setIsLoading] = useState(false);
    const { suivi, fetchSuivi } = useSuiviStore();

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
        if (bmi < 18.5) return { category: "Sous-poids", color: "#2196f3", bg: "#e3f2fd" };
        if (bmi < 25) return { category: "Poids normal", color: "#4caf50", bg: "#e8f5e8" };
        if (bmi < 30) return { category: "Surpoids", color: "#ff9800", bg: "#fff3e0" };
        return { category: "Obésité", color: "#f44336", bg: "#ffebee" };
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const EmptyState = () => (
        <Card 
            p={40} 
            bg="$backgroundHover"
            rounded={20}
            borderWidth={2}
            borderColor="$borderColor"
            borderStyle="dashed"
            elevation={0}
        >
            <YStack items="center" gap={20}>
                <Card 
                    p={24} 
                    bg="$background"
                    rounded={20}
                    opacity={0.7}
                    elevation={2}
                    bordered={false}
                >
                    <BarChart3 size={40} color="$color10" />
                </Card>
                <YStack items="center" gap={8}>
                    <Text 
                        fontSize="$6" 
                        fontWeight="700" 
                        color="$color" 
                    >
                        Aucune mesure enregistrée
                    </Text>
                    <Text 
                        fontSize="$4" 
                        color="$color10" 
                        opacity={0.8}
                    >
                        Commencez par ajouter vos premières mesures
                    </Text>
                </YStack>
            </YStack>
        </Card>
    );

    return (
        <View flex={1} bg="$background">
            {/* Enhanced Header */}
            <Card 
                m={16} 
                mb={20}
                p={20}
                bg="$accent"
                rounded={16}
                shadowColor="$accent"
                shadowOffset={{ width: 0, height: 6 }}
                shadowOpacity={0.3}
                shadowRadius={16}
                elevation={8}
                bordered={false}
            >
                <YStack items="center" gap={8}>
                    <XStack items="center" gap={12}>
                        <Card 
                            p={12} 
                            bg="white"
                            rounded={12}
                            shadowColor="white"
                            shadowOffset={{ width: 0, height: 2 }}
                            shadowOpacity={0.3}
                            shadowRadius={6}
                            bordered={false}
                        >
                            <Activity size={24} color="$accent" />
                        </Card>
                        <H5 color="white" fontWeight="700" fontSize="$6">
                            Suivi Physique
                        </H5>
                    </XStack>
                    <Text 
                        color="white" 
                        fontSize="$3" 
                        opacity={0.9}
                    >
                        {suivi.length} mesure{suivi.length !== 1 ? 's' : ''} enregistrée{suivi.length !== 1 ? 's' : ''}
                    </Text>
                </YStack>
            </Card>

            <ScrollView flex={1} px={16} showsVerticalScrollIndicator={false}>
                <YStack gap={20} pb={100}>
                    {/* Add Button */}
                    <Link href="/(auth)/(modals)/addSuivi" asChild>
                        <Button 
                            size="$5"
                            bg="$accent"
                            rounded={16}
                            pressStyle={{ 
                                scale: 0.98,
                                opacity: 0.8
                            }}
                            hoverStyle={{ 
                                opacity: 0.9
                            }}
                            shadowColor="$accent"
                            shadowOffset={{ width: 0, height: 4 }}
                            shadowOpacity={0.3}
                            shadowRadius={12}
                            elevation={6}
                            fontWeight="600"
                        >
                            <Button.Icon>
                                <Plus size={20} color="white" />
                            </Button.Icon>
                            <Button.Text color="white" fontSize="$4" fontWeight="600">
                                Ajouter une mesure
                            </Button.Text>
                        </Button>
                    </Link>
                    
                    {isLoading ? (
                        <Card 
                            p={40} 
                            bg="$background"
                            rounded={20}
                            shadowColor="$shadowColor"
                            shadowOffset={{ width: 0, height: 4 }}
                            shadowOpacity={0.1}
                            shadowRadius={12}
                            elevation={4}
                            bordered={false}
                        >
                            <YStack items="center" gap={16}>
                                <ActivityIndicator size="large" color="$accent" />
                                <Text fontSize="$4" color="$color10">
                                    Chargement de vos données...
                                </Text>
                            </YStack>
                        </Card>
                    ) : lastEntry ? (
                        <Card 
                            p={0}
                            bordered={false}
                            rounded={20}
                            backgroundColor="$background"
                            shadowColor="$shadowColor"
                            shadowOffset={{ width: 0, height: 8 }}
                            shadowOpacity={0.15}
                            shadowRadius={16}
                            elevation={8}
                            pressStyle={{ 
                                scale: 0.98,
                                shadowOpacity: 0.25 
                            }}
                            hoverStyle={{ 
                                backgroundColor: "$backgroundHover",
                                shadowOpacity: 0.2
                            }}
                            overflow="hidden"
                        >
                            {/* Header accent bar */}
                            <View 
                                height={6} 
                                bg="$accent"
                            />
                            
                            <YStack p={24} gap={20}>
                                {/* Header Section */}
                                <YStack gap={12}>
                                    <XStack items="center" gap={12}>
                                        <Card 
                                            p={10} 
                                            bg="$accent"
                                            rounded={12}
                                            shadowColor="$accent"
                                            shadowOffset={{ width: 0, height: 3 }}
                                            shadowOpacity={0.4}
                                            shadowRadius={6}
                                            bordered={false}
                                        >
                                            <TrendingUp size={18} color="white" />
                                        </Card>
                                        <Text 
                                            fontSize="$6" 
                                            fontWeight="700" 
                                            color="$color"
                                        >
                                            Dernière mesure
                                        </Text>
                                    </XStack>

                                    <XStack items="center" gap={8}>
                                        <Calendar size={16} color="$accent" />
                                        <Text 
                                            fontSize="$3" 
                                            color="$color10" 
                                            opacity={0.8}
                                        >
                                            {formatDate(lastEntry.created_at)}
                                        </Text>
                                    </XStack>
                                </YStack>

                                {/* Stats Section */}
                                <YStack gap={16}>
                                    <XStack gap={12}>
                                        {/* Height Card */}
                                        <Card 
                                            flex={1}
                                            p={20}
                                            bg="$backgroundHover"
                                            rounded={16}
                                            shadowColor="$shadowColor"
                                            shadowOffset={{ width: 0, height: 4 }}
                                            shadowOpacity={0.1}
                                            shadowRadius={8}
                                            elevation={3}
                                            bordered={false}
                                        >
                                            <YStack items="center" gap={12}>
                                                <Card 
                                                    p={12}
                                                    bg="#e3f2fd"
                                                    rounded={12}
                                                    borderWidth={1}
                                                    borderColor="#90caf9"
                                                    shadowColor="#2196f3"
                                                    shadowOffset={{ width: 0, height: 2 }}
                                                    shadowOpacity={0.15}
                                                    shadowRadius={6}
                                                    elevation={2}
                                                    bordered={false}
                                                >
                                                    <Ruler size={20} color="#1565c0" />
                                                </Card>
                                                <YStack items="center" gap={4}>
                                                    <Text fontSize="$7" fontWeight="800" color="$color">
                                                        {lastEntry.height}
                                                    </Text>
                                                    <Text fontSize="$3" color="#1565c0" fontWeight="600">
                                                        cm
                                                    </Text>
                                                    <Text fontSize="$2" color="$color10" opacity={0.8}>
                                                        Taille
                                                    </Text>
                                                </YStack>
                                            </YStack>
                                        </Card>

                                        {/* Weight Card */}
                                        <Card 
                                            flex={1}
                                            p={20}
                                            bg="$backgroundHover"
                                            rounded={16}
                                            shadowColor="$shadowColor"
                                            shadowOffset={{ width: 0, height: 4 }}
                                            shadowOpacity={0.1}
                                            shadowRadius={8}
                                            elevation={3}
                                            bordered={false}
                                        >
                                            <YStack items="center" gap={12}>
                                                <Card 
                                                    p={12}
                                                    bg="#e8f5e8"
                                                    rounded={12}
                                                    borderWidth={1}
                                                    borderColor="#81c784"
                                                    shadowColor="#4caf50"
                                                    shadowOffset={{ width: 0, height: 2 }}
                                                    shadowOpacity={0.15}
                                                    shadowRadius={6}
                                                    elevation={2}
                                                    bordered={false}
                                                >
                                                    <Scale size={20} color="#2e7d32" />
                                                </Card>
                                                <YStack items="center" gap={4}>
                                                    <Text fontSize="$7" fontWeight="800" color="$color">
                                                        {lastEntry.weight}
                                                    </Text>
                                                    <Text fontSize="$3" color="#2e7d32" fontWeight="600">
                                                        kg
                                                    </Text>
                                                    <Text fontSize="$2" color="$color10" opacity={0.8}>
                                                        Poids
                                                    </Text>
                                                </YStack>
                                            </YStack>
                                        </Card>
                                    </XStack>

                                    {/* BMI Card */}
                                    <Card 
                                        p={20}
                                        bg="$backgroundHover"
                                        rounded={16}
                                        shadowColor="$shadowColor"
                                        shadowOffset={{ width: 0, height: 4 }}
                                        shadowOpacity={0.1}
                                        shadowRadius={8}
                                        elevation={3}
                                        bordered={false}
                                    >
                                        <YStack items="center" gap={16}>
                                            <XStack items="center" gap={12}>
                                                <Card 
                                                    p={12}
                                                    bg="$accent"
                                                    rounded={12}
                                                    shadowColor="$accent"
                                                    shadowOffset={{ width: 0, height: 3 }}
                                                    shadowOpacity={0.4}
                                                    shadowRadius={8}
                                                    elevation={4}
                                                    bordered={false}
                                                >
                                                    <BarChart3 size={20} color="white" />
                                                </Card>
                                                <Text fontSize="$5" fontWeight="700" color="$color">
                                                    Indice de Masse Corporelle
                                                </Text>
                                            </XStack>

                                            <YStack items="center" gap={12}>
                                                <Text fontSize="$9" fontWeight="900" color="$color">
                                                    {calculateBMI(lastEntry.weight, lastEntry.height)}
                                                </Text>
                                                
                                                {(() => {
                                                    const bmiData = getBMICategory(parseFloat(calculateBMI(lastEntry.weight, lastEntry.height)));
                                                    return (
                                                        <Card 
                                                            px={20}
                                                            py={12}
                                                            bg="$backgroundHover"
                                                            rounded={12}
                                                            borderWidth={1}
                                                            borderColor="$accent"
                                                            shadowColor="$accent"
                                                            shadowOffset={{ width: 0, height: 2 }}
                                                            shadowOpacity={0.15}
                                                            shadowRadius={6}
                                                            elevation={3}
                                                            bordered={false}
                                                        >
                                                            <Text 
                                                                fontSize="$4" 
                                                                fontWeight="700"
                                                                color="$accent"
                                                            >
                                                                {bmiData.category}
                                                            </Text>
                                                        </Card>
                                                    );
                                                })()}
                                            </YStack>
                                        </YStack>
                                    </Card>
                                </YStack>
                            </YStack>
                        </Card>
                    ) : (
                        <EmptyState />
                    )}
                </YStack>
            </ScrollView>
        </View>
    )
}

