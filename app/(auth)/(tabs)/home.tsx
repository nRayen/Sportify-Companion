import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Button, H1, H2, H4, H6, Text, View, XStack, YStack } from 'tamagui';
import { useAuth } from '@/hooks/useAuth';
import { getUserAPI, User } from '@/libs/api/user';
import { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { ChevronRight } from '@tamagui/lucide-icons';
import { LinkCard } from '@/components/home/LinkCard';


export default function TabOneScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserAPI();
      setUser(user);
      setIsLoading(false);
    }
    getUser();
  }, []);

  return (
    <View p={12}>
      <XStack>
        <H2>Bienvenue <Text color="$accent">{ user?.firstname }</Text></H2>
      </XStack>

      <YStack gap={16} mt={16}>

        {/* Planning */}
        <LinkCard title="Planning" description="Gérez votre planning afin de préparer vos entrainements à l'avance" href="/(auth)/(tabs)/planning" />
        
        {/* Exercices */}
        <LinkCard title="Exercices" description="Gérez votre bibliothèque d'exercices et découvrez-en de nouveaux" href="/(auth)/(tabs)/exercices" />

        {/* Suivi */}
        <LinkCard title="Suivi" description="Suivez votre progression et votre IMC" href="/(auth)/(tabs)/suivi" />
      </YStack>
    </View>
  );
}
