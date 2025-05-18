import {
    H5,
    ScrollView,
    Separator,
    SizableText,
    Stack,
    Tabs,
    Text,
    View,
    XStack,
    YStack,
} from "tamagui";
import { useState } from "react";
import { Exercice } from "@/libs/api/exercices";
import { ExerciseCard } from "./ExerciseCard";

type ExercicesLibraryProps = {
    personalExercices: Exercice[];
    publicExercices: Exercice[];
}


export const ExercicesLibrary = ({ personalExercices, publicExercices }: ExercicesLibraryProps) => {

    const [selectedTab, setSelectedTab] = useState<"personal" | "public">("personal");

    return (
        <XStack height={"100%"}>
            <Tabs
                value={selectedTab}
                onValueChange={(value) => setSelectedTab(value as "personal" | "public")}
                defaultValue="personal"
                orientation="horizontal"
                flexDirection="column"
                width={"100%"}
                rounded="$4"
                overflow="hidden"
                borderColor="$borderColor"
            >
                <Tabs.List
                    separator={<Separator vertical />}
                    mb={"$4"}
                >
                    <Tabs.Tab
                        bg={selectedTab === "personal" ? "$accent" : "$background08"}                        
                        flex={1}
                        value="personal"
                    >
                        <SizableText fontFamily="$body" text="center">
                            Personnels
                        </SizableText>
                    </Tabs.Tab>
                    <Tabs.Tab
                        bg={selectedTab === "public" ? "$accent" : "$background08"}                        
                        flex={1}
                        value="public"
                    >
                        <SizableText fontFamily="$body" text="center">
                            Publics
                        </SizableText>
                    </Tabs.Tab>
                </Tabs.List>


                {/* <Separator /> */}


                <Tabs.Content value="personal" height={"100%"}>
                    {personalExercices.length === 0 ? (
                        <View justify={"center"} items={"center"} height={"100%"}>
                            <Text>Aucun exercice trouvé</Text>
                        </View>
                    ) : (
                    <ScrollView 
                        mb={110} 
                        showsVerticalScrollIndicator={false}
                    >
                        <YStack gap={"$4"} p={"$2"} pb={20}>
                            {personalExercices.map((exercice) => (
                                <ExerciseCard key={exercice.id} exercice={exercice} />
                            ))}
                            </YStack>
                        </ScrollView>
                    )}
                </Tabs.Content>

                <Tabs.Content value="public" height={"100%"}>
                    {publicExercices.length === 0 ? (
                        <View justify={"center"} items={"center"} height={"100%"}>
                            <Text>Aucun exercice trouvé</Text>
                        </View>
                    ) : (
                    <ScrollView 
                        mb={110} 
                        showsVerticalScrollIndicator={false}
                    >
                        <YStack gap={"$4"} p={"$2"} pb={20}>
                            {publicExercices.map((exercice) => (
                                <ExerciseCard key={exercice.id} exercice={exercice} />
                            ))}
                        </YStack>
                    </ScrollView>
                    )}
                </Tabs.Content>
            </Tabs>
        </XStack>
    );
};
