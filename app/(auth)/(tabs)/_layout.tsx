import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { Home, Calendar, LineChart, Settings, Dumbbell } from '@tamagui/lucide-icons';
import { Text } from 'tamagui';
// import { Home, Calendar, Book, LineChart, Settings, Dumbbell } from 'lucide-react-native';
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>['name'];
//   color: string;
// }) {
//   return <FontAwesome size={24} {...props} />;
// }

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      
      screenOptions={{
        animation: 'fade',
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ focused }) => <Home strokeWidth={focused ? 1.5 : 1} color={focused ? "$accent" : "$color"} />,
          tabBarLabel: ({ focused }) => <Text color={focused ? "$accent" : "$color"} fontSize={11} fontWeight={ focused ? "bold" : "normal"}>Accueil</Text>,
        }}
      />
      <Tabs.Screen
        name="planning"
        options={{
          title: 'Planning',
          tabBarIcon: ({ color, focused }) => <Calendar strokeWidth={focused ? 1.5 : 1} color={focused ? "$accent" : "$color"} />,
          tabBarLabel: ({ focused }) => <Text color={focused ? "$accent" : "$color"} fontSize={11} fontWeight={ focused ? "bold" : "normal"}>Planning</Text>,
        }}
      />
      <Tabs.Screen
        name="exercices"
        options={{
          title: 'Exercices',
          tabBarIcon: ({ focused }) => <Dumbbell strokeWidth={focused ? 1.5 : 1} color={focused ? "$accent" : "$color"} />,
          tabBarLabel: ({ focused }) => <Text color={focused ? "$accent" : "$color"} fontSize={11} fontWeight={ focused ? "bold" : "normal"}>Exercices</Text>,
        }}
      />
      <Tabs.Screen
        name="suivi"
        options={{
          title: 'Suivi',
          tabBarIcon: ({ color, focused }) => <LineChart strokeWidth={focused ? 1.5 : 1} color={focused ? "$accent" : "$color"} />,
          tabBarLabel: ({ focused }) => <Text color={focused ? "$accent" : "$color"} fontSize={11} fontWeight={ focused ? "bold" : "normal"}>Suivi</Text>,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => <Settings strokeWidth={focused ? 1.5 : 1} color={focused ? "$accent" : "$color"} />,
          tabBarLabel: ({ focused }) => <Text color={focused ? "$accent" : "$color"} fontSize={11} fontWeight={ focused ? "bold" : "normal"}>Settings</Text>,
        }}
      />
    </Tabs>
  );
}
