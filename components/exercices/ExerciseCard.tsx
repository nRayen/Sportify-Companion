import { Card, XStack, Text, YStack, View } from "tamagui";
import { Globe, Lock, FileText } from "@tamagui/lucide-icons";
import { Exercice } from "@/libs/api/exercices";

interface ExerciseCardProps {
    exercice: Exercice;
    selectedTab?: "personal" | "public";
}

export function ExerciseCard({ exercice, selectedTab = "personal" }: ExerciseCardProps) {

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
            </YStack>
        </Card>
    );
}