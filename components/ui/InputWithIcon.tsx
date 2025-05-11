import { useState } from "react";
import { Input, InputProps, useTheme, XStack, SizeTokens } from "tamagui";

interface InputWithIconProps extends InputProps {
    Icon: any;
    iconColor?: string;
    size?: SizeTokens;
}

export const InputWithIcon = ({ Icon, size = "$4", ...props }: InputWithIconProps) => {
    const [isFocused, setIsFocused] = useState(false);

    const getIconSize = () => {
        const sizeMap: Record<string, number> = {
            "$1": 12,
            "$2": 14,
            "$3": 16,
            "$4": 18,
            "$5": 20,
            "$6": 22,
            "$7": 24,
            "$8": 26,
        };
        return sizeMap[size.toString()] || 18;
    };
    
    const iconSize = getIconSize();
    
    // Calculate appropriate left padding based on icon size
    const paddingLeft = iconSize + 20; // icon size + some spacing

    return (
        <XStack items="center" position="relative" width={props.width || "100%"} flex={props.flex}>
            <Icon 
                color={isFocused ? "$accent" : "$color"} 
                strokeWidth={1} 
                position="absolute" 
                left={10} 
                size={iconSize}
                zIndex={2} 
                pointerEvents="none" 
            />
            <Input 
                {...props} 
                width="100%" 
                size={size}
                style={{ paddingLeft: paddingLeft }} 
                onFocus={() => setIsFocused(true)} 
                onBlur={() => setIsFocused(false)} 
            />
        </XStack>
    );
};


