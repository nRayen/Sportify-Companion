import { ScrollView } from 'react-native';
import { View, YStack, XStack, Card, H4, H5, Paragraph, Button, Text } from 'tamagui';
import { Clock } from '@tamagui/lucide-icons';
import { useSeancesStore } from '@/libs/stores/seancesStore';

interface PlanningSeancesListProps {
  selectedDate: string;
}

export default function PlanningSeancesList({ selectedDate }: PlanningSeancesListProps) {
  const { seances } = useSeancesStore();

  // Filter seances for the selected date
  const selectedDateEvents = seances.filter(seance => 
    seance.date.split('T')[0] === selectedDate
  );

  return (
    <View flex={1}>
      <H4 mb={8}>Séances du <Text color="$accent">{selectedDate}</Text></H4>
      <ScrollView style={{ flex: 1 }}>
        <YStack gap={12}>
          {selectedDateEvents.length > 0 ? (
            selectedDateEvents.map((event) => {

                const date = new Date(event.date).toLocaleDateString('fr-FR', { hour: '2-digit', minute: '2-digit' });

            return (
              <Card 
                key={event.id} 
                p={16} 
                bordered
                borderRadius={12}
                backgroundColor="$background"
                borderColor="$borderColor"
                shadowColor="$shadowColor"
                shadowOffset={{ width: 0, height: 2 }}
                shadowOpacity={0.1}
                shadowRadius={4}
                elevation={3}
                pressStyle={{ scale: 0.98 }}
                hoverStyle={{ backgroundColor: "$backgroundHover" }}
              >
                <YStack gap={8}>
                  <H5 color="$color" fontWeight="600">{event.title}</H5>
                  <XStack items="center" gap={6}>
                    <Clock size={16} color="$accent" />
                    <Paragraph size="$3" color="$accent" fontWeight="500">{date}</Paragraph>
                  </XStack>
                  <Paragraph 
                    size="$3" 
                    color="$color10" 
                    lineHeight={20}
                    mt={4}
                  >
                    {event.objective || 'Aucune description'}
                  </Paragraph>
                </YStack>
              </Card>
            )})
          ) : (
            <View style={{ alignItems: "center", justifyContent: "center" }} p={20}>
              <Paragraph>Aucun événement prévu pour cette date</Paragraph>
            </View>
          )}
        </YStack>
      </ScrollView>
    </View>
  );
} 