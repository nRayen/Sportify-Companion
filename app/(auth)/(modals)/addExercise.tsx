import { SafeArea } from '@/components/SafeArea';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, Button, YStack, Input, Switch, Form, Label, XStack, TextArea } from 'tamagui';
import { SwitchWithLabel } from '@/components/ui/SwitchWithLabel';
import { X, Plus } from '@tamagui/lucide-icons';
import { useExerciseStore } from '@/libs/stores/exercicesStore';

export default function MyModal() {
    const router = useRouter();
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isPublic, setIsPublic] = useState<boolean>(false);
    const { addExercise } = useExerciseStore();

    const handleAddExercise = async () => {
        setIsLoading(true);
        try {
            await addExercise({title, description, public: isPublic});
            setIsLoading(false);
            router.back();
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    }

  return (  
      <View p={12} height={"100%"}>
        <Form onSubmit={handleAddExercise}>
          <YStack gap="$4">
            <YStack>
              <Label htmlFor="title">Nom de l'exercice</Label>
              <Input
                returnKeyType='done'
                caretColor="$accent"
                id="title"
                placeholder="Nom de l'exercice"
                value={title}
                onChangeText={setTitle}
              />
            </YStack>

            <YStack>
              <Label htmlFor="description">Description de l'exercice</Label>
              <TextArea
                minH={100}
                caretColor="$accent"
                id="description"
                placeholder="Description de l'exercice"
                value={description}
                onChangeText={setDescription}
              />
            </YStack>

            <SwitchWithLabel label="Public" size="$4" defaultChecked={isPublic} onCheckedChange={() => setIsPublic(!isPublic)}/>
          </YStack>

          <XStack mt={12} gap="$4">
            <Button onPress={() => router.back()} flex={1}>
              <Button.Icon>
                <X />
              </Button.Icon>
              <Button.Text>Annuler</Button.Text>
            </Button>

            <Button theme="accent" onPress={handleAddExercise} flex={1} disabled={isLoading}>
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
