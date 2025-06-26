import { useEffect, useState } from 'react';
import { ScrollView, View } from 'tamagui';
import { useSeancesStore } from '@/libs/stores/seancesStore';
import { useExerciseStore } from '@/libs/stores/exercicesStore';
import { Seances } from '@/libs/api/seances';
import PlanningCalendar from '@/components/planning/PlanningCalendar';
import PlanningSeancesList from '@/components/planning/PlanningSeancesList';

export default function PlanningScreen() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchSeances } = useSeancesStore();

  useEffect(() => {
    try {
        const loadSeances = async () => {
            setIsLoading(true);
            await fetchSeances();
        setIsLoading(false);
    };
    loadSeances();
    } catch (error) {
        console.error(error);
        setIsLoading(false);
    }
}, []);
  
  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  return (
    <ScrollView p={12} flex={1} showsVerticalScrollIndicator={false}>
      <PlanningCalendar
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
      />

      <PlanningSeancesList selectedDate={selectedDate} />
    </ScrollView>
  );
}

