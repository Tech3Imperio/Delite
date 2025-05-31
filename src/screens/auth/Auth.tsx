import React from 'react';
import { useColorScheme } from 'react-native'; // Import necessary components
import { XStack } from 'tamagui';
import { useThemeColors } from '../../store/themeColors';
import { SignInFrom } from '../../components/auth/SignInForm';
const Auth = () => {

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