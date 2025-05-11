import { ChevronRight } from "@tamagui/lucide-icons";
import { Link, LinkProps } from "expo-router";
import { H6, Text, XStack, YStack } from "tamagui";

interface LinkCardProps {
    title: string;
    description: string;
    href: LinkProps['href'];
}

export const LinkCard = ({ title, description, href }: LinkCardProps) => {
    return (
        <XStack bg="$background" p={16} items="center" justify="space-between" rounded="$4" borderWidth={1} borderColor="$borderColor">
            <YStack width="80%">   
                <H6 color="$accent" fontWeight="500">{title}</H6>
                <Text color="$secondaryText">{description}</Text>
            </YStack>
            <Link href={href} asChild>
                <ChevronRight size={32} color="$accent" />
            </Link>
        </XStack>
    );
}

