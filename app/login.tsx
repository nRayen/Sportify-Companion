import React, { useState } from "react";
import { Button, Form, Input, Text, YStack } from "tamagui";
import { useAuth } from "@/hooks/useAuth";
import { Redirect, useRouter } from "expo-router";

const loginPage = () => {
    const { login, isAuthenticated } = useAuth();
    const router = useRouter();
    const [userLogin, setUserLogin] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // const login = async () => {
    //     console.log(userLogin, password)
    //     const apiUrl = process.env.EXPO_PUBLIC_API_URL
    //     try {
    //         const response = await fetch(`${apiUrl}/auth/login`, {
    //             method: 'POST',
    //             headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ userLogin: userLogin, password: password })
    //     })
    //     console.log(response)
    //     const data = await response.json()
    //     console.log(data)
    //     if (response.ok) {
    //         console.log(data)
    //         } else {
    //             console.log("failed")
    //         }
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    if (isAuthenticated()) {
        return <Redirect href="/home" />
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
                setError("Une erreur est survenue");
            }
            setIsLoading(false);
        }
    };

    return (
        <Form
            onSubmit={handleLogin}
            height="100%"
            width="100%"
            flex={1}
            padding={4}
        >
            <YStack
                height="100%"
                width="100%"
                justifyContent="center"
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
                        {isLoading ? "Connexion..." : "Connexion"}
                    </Button>
                </Form.Trigger>
            </YStack>
        </Form>
    );
};

export default loginPage;
