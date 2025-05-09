import React from 'react';
import { Platform, Text, TextInput } from 'react-native'; // Import necessary components
import { useNavigation, StaticScreenProps } from '@react-navigation/native';
import { Button, Input, View, YStack } from 'tamagui';
import { Plus } from '@tamagui/lucide-icons';
import { usePrimaryBackgroundColor } from '../../../states/primaryBackgroundColor';
type AuthParamProps = StaticScreenProps<{}>
const Auth = ({ route }: AuthParamProps) => {
    const navigation = useNavigation()
    const primaryBackgroundColor = usePrimaryBackgroundColor((state) => state.light)
    const os = Platform.OS
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: "flex-start", flexDirection: "row", backgroundColor: `${primaryBackgroundColor}` }}>
            <YStack gap={8}>
                <Input size="$2" placeholder='Enter Email' paddingBlock={0} onBlur={() => console.log("Blurred")} />
                <Button
                    iconAfter={Plus}
                    onPress={() =>
                        navigation.navigate({ name: "Dashboard", params: {} })
                    }
                ><Text accessibilityRole='header'>{os}</Text></Button>
                <TextInput placeholder='Hellow' />
            </YStack>
        </View>
    );
};

export default Auth;