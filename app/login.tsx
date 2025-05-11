import React, { useState } from "react";
import { Button, Form, H1, Heading, Input, Spinner, Stack, Text, View, YStack } from "tamagui";
import { useAuth } from "@/hooks/useAuth";
import { Link, Redirect, useRouter } from "expo-router";
import { SafeArea } from "@/components/SafeArea";
import { ArrowRight, ChevronRight, Lock, User } from "@tamagui/lucide-icons";
import { InputWithIcon } from "@/components/ui/InputWithIcon";
import PasswordInput from "@/components/ui/PasswordInput";

const loginPage = () => {
    const { login, isAuthenticated } = useAuth();
    const router = useRouter();
    const [userLogin, setUserLogin] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

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
            <Heading text="center" color="$accent">Sportify</Heading>
            <Heading text="center" size="$10" color="$color">Connexion</Heading>
            <Form
                onSubmit={handleLogin}
                flex={1}
        >
            <YStack
                justify="center"
                gap={8}
                flex={1}
            >
                <InputWithIcon
                    size={"$5"}
                    Icon={User}
                    placeholder="Pseudo"
                    value={userLogin}
                    onChangeText={setUserLogin}
                />
                <PasswordInput
                    size={"$5"}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    secureTextEntry={true}
                    placeholder="Mot de passe"
                    value={password}
                    onChangeText={setPassword}
                />
                {error && <Text color="red">{error}</Text>}
                <Form.Trigger asChild>
                    <Button disabled={isLoading} theme="accent" size={"$5"}>
                        {isLoading ? "Connexion" : "Connexion"}
                        <Button.Icon>
                            {isLoading ? <Spinner /> : <ChevronRight />}
                        </Button.Icon>
                    </Button>
                </Form.Trigger>

                <Link href="/register" asChild>
                        <Text color="$color" text="center" mt={8}>
                            Pas de compte ? <Text color="$accent" textDecorationLine="underline">S'inscrire</Text>
                        </Text>
                    </Link>
                </YStack>
            </Form>
        </SafeArea>
    );
};

export default loginPage;
