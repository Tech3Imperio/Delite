import React from 'react';
import { SafeAreaView, View, Text, Pressable } from 'react-native'; // Import necessary components
import { useNavigation, StaticScreenProps } from '@react-navigation/native';
type AuthParamProps = StaticScreenProps<{}>
const Auth = ({ route }: AuthParamProps) => {
    const navigation = useNavigation()
    return (
        <SafeAreaView
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: "row" }}>
            <Pressable
                style={{ padding: 8, backgroundColor: "yellow", borderRadius: 12, cursor: "pointer" }}
                onPress={() =>
                    navigation.navigate({ name: "Dashboard", params: {} })
                }
            ><Text accessibilityRole='header'>Sign In</Text></Pressable>
        </SafeAreaView>
    );
};

export default Auth;