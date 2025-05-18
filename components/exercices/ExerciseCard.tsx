import { Card, XStack, Button, Text, YStack, View, Separator } from "tamagui";
import { Trash, ChevronRight, Globe, Lock } from "@tamagui/lucide-icons";
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
            elevate
            bordered
            animation="medium"
            scale={1}
            hoverStyle={{ scale: 1.02 }}
            pressStyle={{ scale: 0.98 }}
            borderRadius={16}
        >
            <Card.Header padded>
                <XStack style={{ justifyContent: "space-between", alignItems: "center" }}>
                    <Text fontSize={18} fontWeight="bold" color="$color">
                        {exercice.title}
                    </Text>
                    <XStack gap="$2">
                    <YStack style={{ 
                                backgroundColor: "$accent", 
                                borderRadius: 12 
                            }}>
                        {exercice.public ? (
                            <Globe size={18} color="$accent" />
                        ) : (
                            <Lock size={18} color="$accent" />
                        )}
                    </YStack>
                    </XStack>
                </XStack>
            </Card.Header>
            
            <Separator />
            
            <Card.Footer padded>
                <YStack gap="$3" width="100%">
                    {exercice.description && (
                        <Text
                            numberOfLines={2}
                            color="$color10"
                            fontSize={14}
                        >
                            {exercice.description}
                        </Text>
                    )}
                    
                    <XStack style={{ justifyContent: "flex-end" }} gap="$2">
                        <Button
                            size="$3"
                            borderColor="$red9"
                            onPress={handleDeleteExercise}
                            chromeless
                            bg={"$red4"}
                        >
                            <Button.Icon>
                                <Trash size={14} color="$red9" />
                            </Button.Icon>
                            <Text fontSize={12} color="$red9">Supprimer</Text>
                        </Button>
                    </XStack>
                </YStack>
            </Card.Footer>
        </Card>
    );
}