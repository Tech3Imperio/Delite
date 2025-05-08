import React from 'react';
import { SafeAreaView, View, Text, Pressable } from 'react-native'; // Import necessary components
import { useNavigation, StaticScreenProps } from '@react-navigation/native';
import { Button } from 'tamagui';
import { Plus } from '@tamagui/lucide-icons';
type AuthParamProps = StaticScreenProps<{}>
const Auth = ({ route }: AuthParamProps) => {
    const navigation = useNavigation()
    return (
        <SafeAreaView
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: "row" }}>
            <Button
                iconAfter={Plus}
                onPress={() =>
                    navigation.navigate({ name: "Dashboard", params: {} })
                }
            ><Text accessibilityRole='header'>Sign In</Text></Button>
        </SafeAreaView>
    );
};

export default Auth;