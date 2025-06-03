import React, { useContext } from 'react';
import { Text, Button, } from 'react-native'; // Import necessary components
import { useNavigation, StaticScreenProps, StackActions } from '@react-navigation/native';
import { View } from 'tamagui';
import { AuthContext } from '../../navigation/auth/AuthContext';
import { removeToken } from '../../utils/auth/session';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
type DealerDashboardParamProp = StaticScreenProps<{}>
const DealerDashboard = ({ route }: DealerDashboardParamProp) => {
    const navigation = useNavigation<BottomTabNavigationProp<ReactNavigation.DealerParamsList>>()
    const { signOut } = useContext(AuthContext)
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: "row" }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Dealer Screen</Text>
                <Button onPress={() => navigation.goBack()} title='go back' />
                <Button title='Sign Out' onPress={() => {
                    signOut()
                    removeToken()
                }} />
            </View>
        </View>
    );
};

export default DealerDashboard;