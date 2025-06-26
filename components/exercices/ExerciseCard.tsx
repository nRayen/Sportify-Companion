import { Card, XStack, Button, Text, YStack, View, Separator } from "tamagui";
import { Trash, ChevronRight, Globe, Lock, FileText, Eye } from "@tamagui/lucide-icons";
import { Exercice } from "@/libs/api/exercices";
import { useExerciseStore } from "@/libs/stores/exercicesStore";

interface ExerciseCardProps {
    exercice: Exercice;
}

export function ExerciseCard({ exercice }: ExerciseCardProps) {
    const { deleteExercise } = useExerciseStore();

    const handleDeleteExercise = async () => {
        await deleteExercise(exercice.id);
    }

    return (
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
                height={4} 
                bg={exercice.public ? "#4caf50" : "$accent"}
            />
            
            <YStack p={24} gap={20}>
                {/* Header Section */}
                <XStack items="center" justify="space-between">
                        <Text 
                            fontSize="$6" 
                            fontWeight="700" 
                            color="$color"
                            lineHeight={28}
                        >
                            {exercice.title}
                        </Text>
                        
                        {/* Visibility indicator */}
                        <XStack items="center" gap={8}>
                            <Card 
                                p={8} 
                                bg={exercice.public ? "#e8f5e8" : "#e3f2fd"}
                                rounded={12}
                                borderWidth={1}
                                borderColor={exercice.public ? "#81c784" : "#90caf9"}
                                shadowColor={exercice.public ? "#4caf50" : "#2196f3"}
                                shadowOffset={{ width: 0, height: 2 }}
                                shadowOpacity={0.15}
                                shadowRadius={6}
                                elevation={2}
                                bordered={false}
                            >
                                {exercice.public ? (
                                    <Globe size={16} color="#2e7d32" />
                                ) : (
                                    <Lock size={16} color="#1565c0" />
                                )}
                            </Card>
                            <Text 
                                fontSize="$3" 
                                fontWeight="600" 
                                color={exercice.public ? "#2e7d32" : "#1565c0"}
                            >
                                {exercice.public ? "Public" : "Privé"}
                            </Text>
                        </XStack>
                </XStack>

                {/* Description Section */}
                {exercice.description && (
                    <Card 
                        p={16} 
                        bg="$backgroundHover"
                        rounded={16}
                        borderLeftWidth={4}
                        borderLeftColor="$accent"
                        bordered={false}
                        shadowColor="$shadowColor"
                        shadowOffset={{ width: 0, height: 2 }}
                        shadowOpacity={0.1}
                        shadowRadius={8}
                        elevation={2}
                    >
                        <YStack gap={8}>
                            <XStack items="center" gap={8}>
                                <FileText size={16} color="$accent" />
                                <Text fontSize="$3" fontWeight="600" color="$accent">
                                    Description
                                </Text>
                            </XStack>
                            <Text
                                fontSize="$4"
                                color="$color"
                                lineHeight={22}
                                numberOfLines={3}
                            >
                                {exercice.description}
                            </Text>
                        </YStack>
                    </Card>
                )}

                {/* Enhanced Separator */}
                <Separator 
                    borderColor="$borderColor"
                    opacity={0.5}
                />

                {/* Footer Section */}
                <XStack justify="space-between" items="center">
                    {/* Stats or additional info could go here */}
                    <View flex={1} />
                    
                    {/* Enhanced Action Buttons */}
                    <XStack gap={12}>
                        <Button
                            size="$4"
                            bg="#ffebee"
                            borderColor="#f44336"
                            borderWidth={1}
                            rounded={12}
                            onPress={handleDeleteExercise}
                            pressStyle={{ 
                                scale: 0.95,
                                bg: "#ffcdd2" 
                            }}
                            hoverStyle={{ 
                                bg: "#ffcdd2" 
                            }}
                            shadowColor="#f44336"
                            shadowOffset={{ width: 0, height: 3 }}
                            shadowOpacity={0.2}
                            shadowRadius={8}
                            elevation={3}
                        >
                            <Button.Icon>
                                <Trash size={16} color="#d32f2f" />
                            </Button.Icon>
                            <Button.Text 
                                fontSize="$3" 
                                fontWeight="600" 
                                color="#d32f2f"
                            >
                                Supprimer
                            </Button.Text>
                        </Button>
                    </XStack>
                </XStack>
            </YStack>
        </Card>
    );
}