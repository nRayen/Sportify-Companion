import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Button, YStack, Input, Form, Label, XStack } from 'tamagui';
import { X, Plus } from '@tamagui/lucide-icons';
import { useSuiviStore } from '@/libs/stores/suiviStore';

export default function AddSuiviModal() {
    const router = useRouter();
    const [weight, setWeight] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { addSuivi } = useSuiviStore();

    const handleAddSuivi = async () => {
        setIsLoading(true);
        try {
            await addSuivi({taille: height, poids: weight});
            setIsLoading(false);
            router.back();
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    }

  return (  
      <View p={12} height={"100%"}>
        <Form onSubmit={handleAddSuivi}>
          <YStack gap="$4">
            <YStack>
              <Label htmlFor="weight">Poids</Label>
              <Input
                returnKeyType='done'
                caretColor="$accent"
                id="weight"
                placeholder="Poids"
                keyboardType="numeric"
                value={weight.toString()}
                onChangeText={(text) => setWeight(Number(text))}
              />
            </YStack>

            <YStack>
              <Label htmlFor="height">Taille</Label>
              <Input
                caretColor="$accent"
                id="height"
                placeholder="Taille"
                keyboardType="numeric"
                returnKeyType='done'
                value={height.toString()}
                onChangeText={(text) => setHeight(Number(text))}
              />
            </YStack>

          </YStack>

          <XStack mt={12} gap="$4">
            <Button onPress={() => router.back()} flex={1}>
              <Button.Icon>
                <X />
              </Button.Icon>
              <Button.Text>Annuler</Button.Text>
            </Button>

            <Button theme="accent" onPress={handleAddSuivi} flex={1} disabled={isLoading}>
              <Button.Icon>
                <Plus />
              </Button.Icon>
              <Button.Text>{isLoading ? "Ajout en cours..." : "Ajouter"}</Button.Text>
            </Button>
          </XStack>
        </Form>
      </View>
  );
}
