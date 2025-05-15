import React from 'react';
import { useColorScheme, Text } from 'react-native'; // Import necessary components
import { StaticScreenProps } from '@react-navigation/native';
import { XStack } from 'tamagui';
import { useThemeColors } from '../../../states/themeColors';
import { SignInFrom } from '../../../components/auth/SignInForm';
type AuthParamProps = StaticScreenProps<{}>
const Auth = ({ route }: AuthParamProps) => {

    const theme = useColorScheme()
    const themeColors = useThemeColors((state) => theme === "light" ? state.light_colors : state.dark_colors)
    return (
        <XStack id='Test'
            style={{ flex: 1, justifyContent: 'center', alignItems: "center", flexDirection: "row", backgroundColor: `${themeColors.bg_color}` }}>
            <SignInFrom />
        </XStack >
    );
};

export default Auth;