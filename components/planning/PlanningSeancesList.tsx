import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { View, YStack, XStack, Card, H4, H5, Paragraph, Text, Separator } from 'tamagui';
import { Clock, Dumbbell, Target } from '@tamagui/lucide-icons';
import { useSeancesStore } from '@/libs/stores/seancesStore';
import { useExerciseStore } from '@/libs/stores/exercicesStore';

interface PlanningSeancesListProps {
  selectedDate: string;
}

export default function PlanningSeancesList({ selectedDate }: PlanningSeancesListProps) {
  const { seances } = useSeancesStore();
  const { personalExercises, publicExercises, fetchPersonalExercises, fetchPublicExercises } = useExerciseStore();

  useEffect(() => {
    fetchPersonalExercises();
    fetchPublicExercises();
  }, []);

  // Filter seances for the selected date
  const selectedDateEvents = seances.filter(seance => 
    seance.date.split('T')[0] === selectedDate
  );

  // Function to get exercise name by ID
  const getExerciseName = (exerciseId: number) => {
    const exercise = [...personalExercises, ...publicExercises].find(ex => ex.id === exerciseId);
    return exercise ? exercise.title : 'Exercice inconnu';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <View flex={1} pb={60}>
      {/* Enhanced Header */}
      <Card 
        mb={24} 
        p={20}
        bg="$accent"
        borderRadius={16}
        shadowColor="$accent"
        shadowOffset={{ width: 0, height: 6 }}
        shadowOpacity={0.3}
        shadowRadius={16}
        elevation={8}
        bordered={false}
      >
        <YStack items="center" gap={8}>
          <H4 color="white" fontWeight="700">
            Séances du {formatDate(selectedDate)}
          </H4>
          <Text 
            color="white" 
            fontSize="$3" 
            opacity={0.9}
          >
            {selectedDateEvents.length} séance{selectedDateEvents.length !== 1 ? 's' : ''} programmée{selectedDateEvents.length !== 1 ? 's' : ''}
          </Text>
        </YStack>
      </Card>

      <ScrollView style={{ flex: 1 }}>
        <YStack gap={20}>
          {selectedDateEvents.length > 0 ? (
            selectedDateEvents.map((event, eventIndex) => {
              return (
                <Card 
                  key={event.id} 
                  p={0}
                  bordered={false}
                  borderRadius={20}
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
                    {/* Title and time section */}
                    <YStack gap={16}>
                      <H5 
                        color="$color" 
                        fontWeight="700" 
                        fontSize="$6"
                      >
                        {event.title}
                      </H5>
                      
                      <XStack items="center" gap={12}>
                        <Card 
                          p={10} 
                          bg="$accent" 
                          borderRadius={12}
                          shadowColor="$accent"
                          shadowOffset={{ width: 0, height: 3 }}
                          shadowOpacity={0.4}
                          shadowRadius={6}
                          bordered={false}
                        >
                          <Clock size={18} color="white" />
                        </Card>
                        <Text 
                          fontSize="$4" 
                          color="$color" 
                          fontWeight="600"
                        >
                          {formatTime(event.date)}
                        </Text>
                      </XStack>
                    </YStack>

                    {/* Description section */}
                    {event.objective && (
                      <Card 
                        p={20} 
                        bg="$backgroundHover"
                        borderRadius={16}
                        borderLeftWidth={4}
                        borderLeftColor="$accent"
                        bordered={false}
                        shadowColor="$shadowColor"
                        shadowOffset={{ width: 0, height: 2 }}
                        shadowOpacity={0.1}
                        shadowRadius={8}
                        elevation={2}
                      >
                        <YStack gap={12}>
                          <XStack items="center" gap={10}>
                            <Target size={18} color="$accent" />
                            <Text fontSize="$4" fontWeight="700" color="$accent">
                              Objectif
                            </Text>
                          </XStack>
                          <Paragraph 
                            size="$4" 
                            color="$color" 
                            lineHeight={24}
                            fontWeight="400"
                          >
                            {event.objective}
                          </Paragraph>
                        </YStack>
                      </Card>
                    )}

                    {/* Enhanced exercise stats section */}
                    {event.ExerciceStats && event.ExerciceStats.length > 0 && (
                      <>
                        <Separator 
                          mt={8} 
                          mb={16} 
                          borderColor="$borderColor"
                          opacity={0.5}
                        />
                        
                        <YStack gap={20}>
                          {/* Exercise header */}
                          <XStack items="center" gap={16}>
                            <Card 
                              p={16} 
                              bg="$accent"
                              borderRadius={16}
                              shadowColor="$accent"
                              shadowOffset={{ width: 0, height: 4 }}
                              shadowOpacity={0.4}
                              shadowRadius={12}
                              bordered={false}
                              elevation={6}
                            >
                              <Dumbbell size={24} color="white" />
                            </Card>
                            <YStack gap={4}>
                              <Text fontSize="$6" fontWeight="700" color="$color">
                                Exercices
                              </Text>
                              <Text fontSize="$3" color="$color10" opacity={0.8}>
                                {event.ExerciceStats.length} exercice{event.ExerciceStats.length !== 1 ? 's' : ''}
                              </Text>
                            </YStack>
                          </XStack>

                          {/* Exercise cards */}
                          <YStack gap={16}>
                            {event.ExerciceStats.map((exerciceStat, index) => (
                              <Card
                                key={index}
                                p={20}
                                bg="$backgroundHover"
                                borderWidth={0}
                                borderRadius={16}
                                shadowColor="$shadowColor"
                                shadowOffset={{ width: 0, height: 4 }}
                                shadowOpacity={0.1}
                                shadowRadius={12}
                                elevation={4}
                                pressStyle={{ scale: 0.98 }}
                                hoverStyle={{ bg: "$background" }}
                                bordered={false}
                              >
                                <YStack gap={16}>
                                  {/* Exercise name */}
                                  <Text 
                                    fontSize="$5" 
                                    fontWeight="700" 
                                    color="$color"
                                  >
                                    {getExerciseName(exerciceStat.id_exercice)}
                                  </Text>

                                  {/* Stats badges */}
                                  <XStack gap={12} flexWrap="wrap" items="center">
                                    {exerciceStat.sets && (
                                      <Card 
                                        bg="#e3f2fd"
                                        px={16} 
                                        py={12} 
                                        borderRadius={12}
                                        borderWidth={1}
                                        borderColor="#90caf9"
                                        shadowColor="#2196f3"
                                        shadowOffset={{ width: 0, height: 2 }}
                                        shadowOpacity={0.15}
                                        shadowRadius={6}
                                        elevation={3}
                                        bordered={false}
                                      >
                                        <XStack items="center" gap={8}>
                                          <Text 
                                            fontSize="$2" 
                                            fontWeight="700" 
                                            color="#1565c0"
                                          >
                                            SÉRIES
                                          </Text>
                                          <Text 
                                            fontSize="$4" 
                                            fontWeight="800" 
                                            color="#0d47a1"
                                          >
                                            {exerciceStat.sets}
                                          </Text>
                                        </XStack>
                                      </Card>
                                    )}

                                    {exerciceStat.reps && (
                                      <Card 
                                        bg="#e8f5e8"
                                        px={16} 
                                        py={12} 
                                        borderRadius={12}
                                        borderWidth={1}
                                        borderColor="#81c784"
                                        shadowColor="#4caf50"
                                        shadowOffset={{ width: 0, height: 2 }}
                                        shadowOpacity={0.15}
                                        shadowRadius={6}
                                        elevation={3}
                                        bordered={false}
                                      >
                                        <XStack items="center" gap={8}>
                                          <Text 
                                            fontSize="$2" 
                                            fontWeight="700" 
                                            color="#2e7d32"
                                          >
                                            REPS
                                          </Text>
                                          <Text 
                                            fontSize="$4" 
                                            fontWeight="800" 
                                            color="#1b5e20"
                                          >
                                            {exerciceStat.reps}
                                          </Text>
                                        </XStack>
                                      </Card>
                                    )}

                                    {exerciceStat.weight && (
                                      <Card 
                                        bg="#fff3e0"
                                        px={16} 
                                        py={12} 
                                        borderRadius={12}
                                        borderWidth={1}
                                        borderColor="#ffb74d"
                                        shadowColor="#ff9800"
                                        shadowOffset={{ width: 0, height: 2 }}
                                        shadowOpacity={0.15}
                                        shadowRadius={6}
                                        elevation={3}
                                        bordered={false}
                                      >
                                        <XStack items="center" gap={8}>
                                          <Text 
                                            fontSize="$2" 
                                            fontWeight="700" 
                                            color="#ef6c00"
                                          >
                                            POIDS
                                          </Text>
                                          <Text 
                                            fontSize="$4" 
                                            fontWeight="800" 
                                            color="#e65100"
                                          >
                                            {exerciceStat.weight}kg
                                          </Text>
                                        </XStack>
                                      </Card>
                                    )}
                                  </XStack>
                                </YStack>
                              </Card>
                            ))}
                          </YStack>
                        </YStack>
                      </>
                    )}
                  </YStack>
                </Card>
              )
            }) 
          ) : (
            <Card 
              p={40} 
              bg="$backgroundHover"
              borderRadius={20}
              borderWidth={2}
              borderColor="$borderColor"
              borderStyle="dashed"
              elevation={0}
            >
              <YStack items="center" gap={20}>
                <Card 
                  p={24} 
                  bg="$background"
                  borderRadius={20}
                  opacity={0.7}
                  elevation={2}
                  bordered={false}
                >
                  <Dumbbell size={40} color="$color10" />
                </Card>
                <YStack items="center" gap={8}>
                  <Text 
                    fontSize="$6" 
                    fontWeight="700" 
                    color="$color" 
                  >
                    Aucune séance prévue
                  </Text>
                  <Paragraph 
                    size="$4" 
                    color="$color10" 
                    opacity={0.8}
                  >
                    Pas de séance programmée pour cette date
                  </Paragraph>
                </YStack>
              </YStack>
            </Card>
          )}
        </YStack>
      </ScrollView>
    </View>
  );
} 