import { Eye, EyeOff, Lock } from "@tamagui/lucide-icons";
import { useState } from "react";
import { Pressable } from "react-native";
import { Button, Input, InputProps, SizeTokens, XStack } from "tamagui";

interface PasswordInputProps extends InputProps {
    showPassword: boolean;
    setShowPassword: (showPassword: boolean) => void;
    size?: SizeTokens;
}

const PasswordInput = ({ showPassword, setShowPassword, size = "$4", ...props }: PasswordInputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

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
        <XStack items="center" position="relative">
            <Lock 
                color={isFocused ? '$accent' : '$color'} 
                strokeWidth={1} 
                position="absolute" 
                size={iconSize}
                l={10} 
                z={2} 
                pointerEvents="none"
            />
            
            <Input 
                width="100%" 
                style={{ paddingLeft: paddingLeft }}
                size={size} 
                {...props} 
                secureTextEntry={!showPassword} 
                onFocus={() => setIsFocused(true)} 
                onBlur={() => setIsFocused(false)} 
            />

            <Pressable 
                onPress={() => setShowPassword(!showPassword)} 
                style={{ 
                    position: 'absolute', 
                    right: 10, 
                    zIndex: 2,
                    height: '100%',
                    justifyContent: 'center'
                }} 
                onPressIn={() => setIsPressed(true)} 
                onPressOut={() => setIsPressed(false)}
            >
                {showPassword ? 
                    <Eye size={iconSize} color={isPressed ? '$accent' : '$color'} strokeWidth={1} /> : 
                    <EyeOff size={iconSize} color={isPressed ? '$accent' : '$color'} strokeWidth={1} />
                }
            </Pressable>
        </XStack>
    );
};

export default PasswordInput;
