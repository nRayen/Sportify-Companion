import { ScrollView } from 'react-native';
import { View, YStack, XStack, Card, H4, H5, Paragraph, Button } from 'tamagui';
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
      <H4 mb={8}>Événements du {selectedDate}</H4>
      <ScrollView style={{ flex: 1 }}>
        <YStack gap={12}>
          {selectedDateEvents.length > 0 ? (
            selectedDateEvents.map((event) => {

                const date = new Date(event.date).toLocaleDateString('fr-FR', { hour: '2-digit', minute: '2-digit' });

            return (
              <Card key={event.id} p={12} bordered>
                <YStack>
                  <H5>{event.title}</H5>
                  <XStack items="center" gap={4} mt={4}>
                    <Clock size={14} />
                    <Paragraph size="$2">{date}</Paragraph>
                  </XStack>
                  <Paragraph mt={8}>{event.objective || 'Aucune description'}</Paragraph>
                </YStack>
              </Card>
            )})
          ) : (
            <View style={{ alignItems: "center", justifyContent: "center" }} p={20}>
              <Paragraph>Aucun événement prévu pour cette date</Paragraph>
              <Button theme="accent" size="$3" mt={12}>
                <Button.Text>Ajouter un entraînement</Button.Text>
              </Button>
            </View>
          )}
        </YStack>
      </ScrollView>
    </View>
  );
} 