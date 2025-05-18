import { SafeArea } from "@/components/SafeArea";
import { Plus } from "@tamagui/lucide-icons";
import { Button, Spinner, View } from "tamagui";
import { ExercicesLibrary } from "@/components/exercices/ExercicesLibrary";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import { useExerciseStore } from "@/libs/stores/exercicesStore";

export default function ExercisesScreen() {
    const { fetchPersonalExercises, fetchPublicExercises } = useExerciseStore();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadExercises = async () => {
            setIsLoading(true);
            await Promise.all([
                fetchPersonalExercises(),
                fetchPublicExercises()
            ]);
            setIsLoading(false);
        };
        loadExercises();
    }, []);

    return (
        <View p={12} height={"100%"}>
            <Link href="/(auth)/(modals)/addExercise" asChild>
                <Button theme={"accent"} mb={16}>
                    <Button.Icon>
                        <Plus />
                    </Button.Icon>
                    <Button.Text>Ajouter un exercice</Button.Text>
                </Button>
            </Link>

            {isLoading ? (
                <View justify={"center"} items={"center"} height={"100%"}>
                    <Spinner size="large"/>
                </View>
            ) : (
                <ExercicesLibrary />
            )}
        </View>
    )
}