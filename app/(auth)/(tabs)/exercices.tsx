import { SafeArea } from "@/components/SafeArea";
import { Plus } from "@tamagui/lucide-icons";
import { Button, ScrollView, Spinner, View } from "tamagui";
import { ExercicesLibrary } from "@/components/exercices/ExercicesLibrary";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import { useExerciseStore } from "@/libs/stores/exercicesStore";

export default function ExercisesScreen() {
    const { fetchPersonalExercises, fetchPublicExercises } = useExerciseStore();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        try {
            const loadExercises = async () => {
                setIsLoading(true);
                await Promise.all([
                fetchPersonalExercises(),
                fetchPublicExercises()
            ]);
            setIsLoading(false);
        };
        loadExercises();
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }, []);

    return (
        <ScrollView p={12} height={"100%"}>
                    {/* <Link href="/(auth)/(modals)/addExercise" asChild>
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
                                Ajouter un exercice
                            </Button.Text>
                        </Button>
                    </Link> */}

            {isLoading ? (
                <View justify={"center"} items={"center"} height={"100%"}>
                    <Spinner size="large"/>
                </View>
            ) : (
                <ExercicesLibrary />
            )}
        </ScrollView>
    )
}