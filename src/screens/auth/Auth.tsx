import React from 'react';
import { useColorScheme, Text } from 'react-native'; // Import necessary components
import { useNavigation, StaticScreenProps } from '@react-navigation/native';
import { Button, Input, XStack, YStack } from 'tamagui';
import { LogIn } from '@tamagui/lucide-icons';
import { useThemeColors } from '../../../states/themeColors';
type AuthParamProps = StaticScreenProps<{}>
const Auth = ({ route }: AuthParamProps) => {

    const theme = useColorScheme()
    const themeColors = useThemeColors((state) => theme === "light" ? state.light_colors : state.dark_colors)
    const navigation = useNavigation()
    const bg_color = themeColors.bg_color
    return (
        <XStack
            style={{ flex: 1, justifyContent: 'center', alignItems: "center", flexDirection: "row", backgroundColor: `${bg_color}` }}>
            <YStack gap={12}>
                <Input size="$2" placeholder='User ID' paddingBlock={0} onBlur={() => console.log("Blurred")} placeholderTextColor={themeColors.ph_color} />
                <Input size="$2" placeholder='Password' paddingBlock={0} onBlur={() => console.log("Blurred")} placeholderTextColor={themeColors.ph_color} />
                <Button
                    themeInverse
                    size="$3"
                    borderWidth={0.5}
                    iconAfter={LogIn}
                    onPress={() =>
                        navigation.navigate({ name: "Dashboard", params: {} })
                    }
                >Sign In</Button>
            </YStack>
        </XStack >
    );
};

export default Auth;