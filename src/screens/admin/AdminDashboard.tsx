import React, { useContext } from 'react';
import { Button, } from 'react-native'; // Import necessary components
import { useNavigation, StaticScreenProps, StackActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Text } from 'tamagui';
import { AuthContext } from '../../navigation/auth/AuthContext';
import { removeToken } from '../../utils/auth/session';
import { Wrapper } from '../../lib/wrapper';
type AdminDashboardParamProp = StaticScreenProps<{}>
const AdminDashboard = ({ route }: AdminDashboardParamProp) => {
    const navigation = useNavigation<NativeStackNavigationProp<ReactNavigation.AdminParamsList>>()
    const { signOut } = useContext(AuthContext)

    return (
        <Wrapper>
            <View
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: "row" }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Admin Screen</Text>
                    <Button onPress={() => navigation.push("AdminDashboard", {})} title='Add to stack' />
                    <Button onPress={() => navigation.goBack()} title='go back' />
                    <Button title='Sign Out' onPress={() => {
                        signOut()
                        removeToken()
                    }} />
                </View>
            </View>
        </Wrapper>
    );
};

export default AdminDashboard;