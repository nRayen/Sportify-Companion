import React, { useState } from "react";
import { Button, Form, Heading, Input, Text, View, YStack } from "tamagui";
import { useAuth } from "@/hooks/useAuth";
import { Redirect, useRouter } from "expo-router";
import { SafeArea } from "@/components/SafeArea";

const RegisterPage = () => {
    const { login, isAuthenticated } = useAuth();
    const router = useRouter();
    const [userLogin, setUserLogin] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    if (isAuthenticated()) {
        return <Redirect href="/(auth)/(tabs)/home" />
    }

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            await login(userLogin.trim(), password.trim());
            setIsLoading(false);
        } catch (error : unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                console.error(error);
                setError("Une erreur est survenue");
            }
            setIsLoading(false);
        }
    };

    return (
        <SafeArea>
            <Heading color="red">Inscription</Heading>
            <Form
                onSubmit={handleLogin}
                flex={1}
                p={14}
        >
            <YStack
                // justify="center"
                gap={4}
                flex={1}
            >
                <Input
                    placeholder="Pseudo"
                    value={userLogin}
                    onChangeText={setUserLogin}
                />
                <Input
                    placeholder="Mot de passe"
                    value={password}
                    onChangeText={setPassword}
                />
                {error && <Text color="red">{error}</Text>}
                <Form.Trigger asChild>
                    <Button disabled={isLoading}>
                        {isLoading ? "Inscription..." : "Inscription"}
                    </Button>
                </Form.Trigger>
            </YStack>
        </Form>
        </SafeArea>
    );
};

export default RegisterPage;
