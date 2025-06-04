import { Calendar } from 'react-native-calendars';
import { useSeancesStore } from '@/libs/stores/seancesStore';

interface MarkedDates {
  [date: string]: {
    marked?: boolean;
    dotColor?: string;
    selected?: boolean;
    selectedColor?: string;
  };
}

interface PlanningCalendarProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export default function PlanningCalendar({ selectedDate, onDateChange }: PlanningCalendarProps) {

    const { seances } = useSeancesStore();
    // console.log(seances);
    // console.log(selectedDate);
    
    const todayString = new Date().toISOString().split('T')[0];
    
  // Create marked dates for the calendar
  const markedDates: MarkedDates = {};
  
  // Get unique dates from seances

  const seanceDates = [...new Set(seances.map(seance => seance.date))];
  
  seanceDates.forEach(date => {
    markedDates[date] = { 
      marked: true, 
      dotColor: '#0000aa',
      selected: date === selectedDate,
      selectedColor: '#0000aa',
    };
  });

  // Always mark today
  markedDates[todayString] = {
    ...markedDates[todayString],
    marked: true,
    dotColor: 'green',
  };

  // If today is selected, mark it appropriately
  if (selectedDate === todayString) {
    markedDates[todayString] = {
      ...markedDates[todayString],
      selected: true,
      selectedColor: '$accent',
    };
  }

  return (
    <Calendar
      style={{
        borderRadius: 10,
        marginBottom: 16,
      }}
      theme={{
        backgroundColor: '$background',
        calendarBackground: '$background',
        textSectionTitleColor: '$color',
        selectedDayBackgroundColor: '$accent',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '$accent',
        dayTextColor: '$color',
        textDisabledColor: '$gray10',
        dotColor: '$accent',
        selectedDotColor: '#ffffff',
        arrowColor: '$accent',
        monthTextColor: '$color',
        indicatorColor: '$accent',
        textDayFontWeight: '300',
        textMonthFontWeight: 'bold',
        textDayHeaderFontWeight: '500',
      }}
      onDayPress={(day) => onDateChange(day.dateString)}
      markedDates={markedDates}
      enableSwipeMonths={true}
    />
  );
}

export type { MarkedDates };
