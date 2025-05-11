import React, { useState } from "react";
import { Button, Form, Heading, Input, Spinner, Text, XStack, YStack } from "tamagui";
import { useAuth } from "@/hooks/useAuth";
import { Redirect, Link, useRouter } from "expo-router";
import { SafeArea } from "@/components/SafeArea";
import { ChevronRight, Mail, User, Users } from "@tamagui/lucide-icons";
import { InputWithIcon } from "@/components/ui/InputWithIcon";
import PasswordInput from "@/components/ui/PasswordInput";

const RegisterPage = () => {
    const { register, isAuthenticated } = useAuth();
    const router = useRouter();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    if (isAuthenticated()) {
        return <Redirect href="/(auth)/(tabs)/home" />;
    }

    const validateInputs = () => {
        if (!firstname.trim()) {
            setError("Le prénom est requis");
            return false;
        }
        if (!lastname.trim()) {
            setError("Le nom est requis");
            return false;
        }
        if (!pseudo.trim()) {
            setError("Le pseudo est requis");
            return false;
        }
        if (!email.trim()) {
            setError("L'email est requis");
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email.trim())) {
            setError("Veuillez entrer un email valide");
            return false;
        }
        if (!password.trim()) {
            setError("Le mot de passe est requis");
            return false;
        }
        if (password.trim().length < 6) {
            setError("Le mot de passe doit contenir au moins 6 caractères");
            return false;
        }
        return true;
    };

    const handleRegister = async () => {
        setError("");
        
        if (!validateInputs()) {
            return;
        }
        
        try {
            setIsLoading(true);
            await register(
                firstname.trim(), 
                lastname.trim(), 
                pseudo.trim(), 
                email.trim(), 
                password.trim()
            );
            setIsLoading(false);
            // Show success message and redirect to login
            router.push("/login");
        } catch (error) {
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
            <Heading text="center" size="$10" color="$color">Inscription</Heading>
            <Form
                onSubmit={handleRegister}
                flex={1}
            >
                <YStack
                    justify="center"
                    gap={8}
                    flex={1}
                    width="100%"
                >
                    <XStack gap={8} width="100%">
                        <InputWithIcon
                            size={"$5"}
                            Icon={User}
                            flex={1}
                            placeholder="Prénom"
                            value={firstname}
                            onChangeText={setFirstname}
                        />
                        <InputWithIcon
                            size={"$5"}
                            Icon={User}
                            flex={1}
                            placeholder="Nom"
                            value={lastname}
                            onChangeText={setLastname}
                        />
                    </XStack>
                    <InputWithIcon
                        size={"$5"}
                        Icon={Users}
                        placeholder="Pseudo"
                        value={pseudo}
                        onChangeText={setPseudo}
                        autoCapitalize="none"
                    />
                    <InputWithIcon
                        size={"$5"}
                        Icon={Mail}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
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
                            {isLoading ? "Inscription" : "S'inscrire"}
                            <Button.Icon>
                                {isLoading ? <Spinner /> : <ChevronRight />}
                            </Button.Icon>
                        </Button>
                    </Form.Trigger>
                    <Link href="/login" asChild>
                        <Text color="$color" text="center" mt={8}>
                            Déjà un compte ? <Text color="$accent" textDecorationLine="underline">Se connecter</Text>
                        </Text>
                    </Link>
                </YStack>
            </Form>
        </SafeArea>
    );
};

export default RegisterPage;
