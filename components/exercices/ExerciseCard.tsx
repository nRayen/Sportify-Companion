import { Card, XStack, Button, Text } from "tamagui";
import { Pencil, Trash } from "@tamagui/lucide-icons";
import { Exercice } from "@/libs/api/exercices";

interface ExerciseCardProps {
    exercice: Exercice;
}

export function ExerciseCard({ exercice }: ExerciseCardProps) {
    return (
        <Card
            elevate
            size="$4"
            bordered
            animation="bouncy"
            scale={0.9}
            hoverStyle={{ scale: 0.95 }}
            pressStyle={{ scale: 0.925 }}
        >
            <Card.Header padded>
                <XStack justify={"center"}>
                    <Text fontSize="$5" fontWeight="bold" flex={1}>
                        {exercice.title}
                    </Text>
                    <XStack justify={"center"} gap="$2">
                        <Button
                            icon={Pencil}
                            size="$3"
                            circular
                            chromeless
                        />
                        <Button
                            icon={Trash}
                            size="$3"
                            circular
                            chromeless
                            themeInverse
                        />
                    </XStack>
                </XStack>
            </Card.Header>
        </Card>
    );
}