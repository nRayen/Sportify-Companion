import { SafeArea } from "@/components/SafeArea";
import { Plus } from "@tamagui/lucide-icons";
import { Button, ScrollView, Spinner, Text, View } from "tamagui";
import { ExercicesLibrary } from "@/components/exercices/ExercicesLibrary";
import { Suspense, useEffect, useState } from "react";
import { Exercice, getPersonalExercicesAPI, getPublicExercicesAPI } from "@/libs/api/exercices";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { router, Link } from "expo-router";

export default function ExercisesScreen() {

    const [personalExercices, setPersonalExercices] = useState<Exercice[]>([]);
    const [publicExercices, setPublicExercices] = useState<Exercice[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getExercices = async () => {
            setIsLoading(true);
            const exercices = await getPersonalExercicesAPI();
            const publicExercices = await getPublicExercicesAPI();
            setPersonalExercices(exercices);
            setPublicExercices(publicExercices);
            setIsLoading(false);
        };
        getExercices();
    }, []);

    const openAddExerciceModal = () => {
        router.push("/(auth)/(modals)/addExercise");
    }

    return (
        <View p={12} height={"100%"}>
            <Link href="/(auth)/(modals)/addExercise" asChild>
                <Button theme={"accent"} onPress={openAddExerciceModal} mb={16}>
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
                <ExercicesLibrary personalExercices={personalExercices} publicExercices={publicExercices} />
            )}
        </View>
    )
}