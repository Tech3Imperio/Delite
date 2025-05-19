import React, { useContext } from 'react';
import { Text, Button, } from 'react-native'; // Import necessary components
import { useNavigation, StaticScreenProps, StackActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View } from 'tamagui';
import { AuthContext } from '../../navigation/AuthContext';
import { removeToken } from '../../utils/auth/session';
type DealerDashboardParamProp = StaticScreenProps<{}>
const DealerDashboard = ({ route }: DealerDashboardParamProp) => {
    const navigation = useNavigation<NativeStackNavigationProp<ReactNavigation.DealerParamsList>>()
    const { signOut } = useContext(AuthContext)
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: "row" }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Dealer Screen</Text>
                <Button onPress={() => navigation.push("DealerDashboard", {})} title='Add to stack' />
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