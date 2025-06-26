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
    Card,
} from "tamagui";
import { useState } from "react";
import { Exercice } from "@/libs/api/exercices";
import { ExerciseCard } from "./ExerciseCard";
import { useExerciseStore } from "@/libs/stores/exercicesStore";
import { Dumbbell, User, Globe } from "@tamagui/lucide-icons";

export const ExercicesLibrary = () => {
    const { personalExercises, publicExercises } = useExerciseStore();
    const [selectedTab, setSelectedTab] = useState<"personal" | "public">("personal");

    const EmptyState = ({ isPersonal }: { isPersonal: boolean }) => (
        <Card 
            p={40} 
            bg="$backgroundHover"
            rounded={20}
            borderWidth={2}
            borderColor="$borderColor"
            borderStyle="dashed"
            elevation={0}
            m={16}
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
                    {isPersonal ? (
                        <User size={40} color="$color10" />
                    ) : (
                        <Globe size={40} color="$color10" />
                    )}
                </Card>
                <YStack items="center" gap={8}>
                    <Text 
                        fontSize="$6" 
                        fontWeight="700" 
                        color="$color" 
                    >
                        Aucun exercice {isPersonal ? 'personnel' : 'public'}
                    </Text>
                    <Text 
                        fontSize="$4" 
                        color="$color10" 
                        opacity={0.8}
                    >
                        {isPersonal ? 'Créez votre premier exercice personnalisé' : 'Aucun exercice public disponible'}
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
                            <Dumbbell size={24} color="$accent" />
                        </Card>
                        <H5 color="white" fontWeight="700" fontSize="$6">
                            Bibliothèque d'Exercices
                        </H5>
                    </XStack>
                    <Text 
                        color="white" 
                        fontSize="$3" 
                        opacity={0.9}
                    >
                        {selectedTab === "personal" ? personalExercises.length : publicExercises.length} exercice{(selectedTab === "personal" ? personalExercises.length : publicExercises.length) !== 1 ? 's' : ''} disponible{(selectedTab === "personal" ? personalExercises.length : publicExercises.length) !== 1 ? 's' : ''}
                    </Text>
                </YStack>
            </Card>

            <XStack flex={1} px={16}>
                <Tabs
                    value={selectedTab}
                    onValueChange={(value) => setSelectedTab(value as "personal" | "public")}
                    defaultValue="personal"
                    orientation="horizontal"
                    flexDirection="column"
                    width="100%"
                    rounded={20}
                    overflow="hidden"
                    bg="$background"
                    shadowColor="$shadowColor"
                    shadowOffset={{ width: 0, height: 4 }}
                    shadowOpacity={0.1}
                    shadowRadius={12}
                    elevation={4}
                >
                    <Tabs.List
                        separator={<View width={2} />}
                        mb={16}
                        bg="$backgroundHover"
                        p={6}
                        rounded={16}
                        mx={16}
                        mt={16}
                    >
                        <Tabs.Tab
                            bg={selectedTab === "personal" ? "$accent" : "transparent"}
                            flex={1}
                            value="personal"
                            rounded={12}
                            pressStyle={{ scale: 0.98 }}
                            hoverStyle={{ 
                                bg: selectedTab === "personal" ? "$accent" : "$background" 
                            }}
                            shadowColor={selectedTab === "personal" ? "$accent" : "transparent"}
                            shadowOffset={{ width: 0, height: 3 }}
                            shadowOpacity={selectedTab === "personal" ? 0.3 : 0}
                            shadowRadius={8}
                            elevation={selectedTab === "personal" ? 4 : 0}
                            p={12}
                        >
                            <XStack items="center" gap={8}>
                                <User 
                                    size={18} 
                                    color={selectedTab === "personal" ? "white" : "$color"} 
                                />
                                <SizableText 
                                    fontFamily="$body" 
                                    fontWeight="600"
                                    color={selectedTab === "personal" ? "white" : "$color"}
                                >
                                    Personnels
                                </SizableText>
                            </XStack>
                        </Tabs.Tab>
                        <Tabs.Tab
                            bg={selectedTab === "public" ? "$accent" : "transparent"}
                            flex={1}
                            value="public"
                            rounded={12}
                            pressStyle={{ scale: 0.98 }}
                            hoverStyle={{ 
                                bg: selectedTab === "public" ? "$accent" : "$background" 
                            }}
                            shadowColor={selectedTab === "public" ? "$accent" : "transparent"}
                            shadowOffset={{ width: 0, height: 3 }}
                            shadowOpacity={selectedTab === "public" ? 0.3 : 0}
                            shadowRadius={8}
                            elevation={selectedTab === "public" ? 4 : 0}
                            p={12}
                        >
                            <XStack items="center" gap={8}>
                                <Globe 
                                    size={18} 
                                    color={selectedTab === "public" ? "white" : "$color"} 
                                />
                                <SizableText 
                                    fontFamily="$body" 
                                    fontWeight="600"
                                    color={selectedTab === "public" ? "white" : "$color"}
                                >
                                    Publics
                                </SizableText>
                            </XStack>
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Content value="personal" flex={1}>
                        {personalExercises.length === 0 ? (
                            <EmptyState isPersonal={true} />
                        ) : (
                            <ScrollView 
                                showsVerticalScrollIndicator={false}
                                pb={120}
                            >
                                <YStack gap={16} pb={20}>
                                    {personalExercises.map((exercice) => (
                                        <ExerciseCard key={exercice.id} exercice={exercice} />
                                    ))}
                                </YStack>
                            </ScrollView>
                        )}
                    </Tabs.Content>

                    <Tabs.Content value="public" flex={1}>
                        {publicExercises.length === 0 ? (
                            <EmptyState isPersonal={false} />
                        ) : (
                            <ScrollView 
                                showsVerticalScrollIndicator={false}
                                pb={120}
                            >
                                <YStack gap={16} pb={20}>
                                    {publicExercises.map((exercice) => (
                                        <ExerciseCard key={exercice.id} exercice={exercice} />
                                    ))}
                                </YStack>
                            </ScrollView>
                        )}
                    </Tabs.Content>
                </Tabs>
            </XStack>
        </View>
    );
};
