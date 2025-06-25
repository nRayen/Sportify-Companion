import { Stack } from 'expo-router';

export default function ModalsLayout() {
  return (
    <Stack screenOptions={{
    //   headerBackVisible: true,
    //   headerBackTitle: "Retour"
    }}>
      <Stack.Screen 
        name="addExercise" 
        options={{
          title: "Ajouter un exercice",
        }} 
      />
      <Stack.Screen 
        name="addSuivi" 
        options={{
          title: "Ajouter une mesure",
        }} 
      />
    </Stack>
  );
}
