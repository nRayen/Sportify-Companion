import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useSeancesStore } from '@/libs/stores/seancesStore';
import { useColorScheme } from '@/components/useColorScheme';
import { useTheme } from 'tamagui';

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

LocaleConfig.locales["fr-FR"] = {
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  monthNamesShort: [
    "Jan",
    "Fev",
    "Mar",
    "Avr",
    "Mai",
    "Jun",
    "Jul",
    "Août",
    "Sept",
    "Oct",
    "Nov",
    "Déc",
  ],
  dayNames: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ],
  dayNamesShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
  today: "Aujourd'hui",
}
LocaleConfig.defaultLocale = "fr-FR"

export default function PlanningCalendar({ selectedDate, onDateChange }: PlanningCalendarProps) {

  const colorScheme = useColorScheme();
  const theme = useTheme();
  const { seances } = useSeancesStore();
  const todayString = new Date().toISOString().split('T')[0];
  
  // Use Tamagui theme colors
  const calendarTheme = {
    backgroundColor: theme.background.val,
    calendarBackground: "#00000000",
    textSectionTitleColor: theme.color.val,
    selectedDayBackgroundColor: theme.accent.val,
    selectedDayTextColor: theme.background.val,
    todayTextColor: theme.green9.val,
    dayTextColor: theme.color.val,
    textDisabledColor: theme.color7.val,
    dotColor: theme.accent.val,
    selectedDotColor: theme.background.val,
    arrowColor: theme.accent.val,
    monthTextColor: theme.color.val,
    indicatorColor: theme.accent.val,
    textDayFontWeight: '300' as const,
    textMonthFontWeight: 'bold' as const,
    textDayHeaderFontWeight: '500' as const,
  };
  
  // Create marked dates for the calendar
  const markedDates: MarkedDates = {};
  
  // Get unique dates from seances
  const seanceDates = [...new Set(seances.map(seance => seance.date))];
  
  seanceDates.forEach(date => {
    markedDates[date] = { 
      marked: true, 
      dotColor: theme.accent.val,
      selected: date === selectedDate,
      selectedColor: theme.accent.val,
    };
  });

  // Always mark today
  markedDates[todayString] = {
    ...markedDates[todayString],
    marked: true,
    dotColor: theme.green9.val,
  };

  // If today is selected, mark it appropriately
  if (selectedDate === todayString) {
    markedDates[todayString] = {
      ...markedDates[todayString],
      selected: true,
      selectedColor: theme.accent.val,
    };
  }

  return (
    <Calendar
      style={{
        borderRadius: 10,
        marginBottom: 16,
        backgroundColor: theme.background.val,
        shadowColor: theme.shadowColor.val,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: colorScheme === 'dark' ? 0.3 : 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
      theme={calendarTheme}
      onDayPress={(day) => onDateChange(day.dateString)}
      markedDates={markedDates}
      enableSwipeMonths={true}
      
    />
  );
}

export type { MarkedDates };
