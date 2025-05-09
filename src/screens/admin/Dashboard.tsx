import React from 'react';
import { Text, Button, } from 'react-native'; // Import necessary components
import { useNavigation, StaticScreenProps, StackActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View } from 'tamagui';
type DashboardParamProp = StaticScreenProps<{}>
const Dashboard = ({ route }: DashboardParamProp) => {
    const navigation = useNavigation<NativeStackNavigationProp<ReactNavigation.RootParamList>>()
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: "row" }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
                <Button onPress={() => navigation.push("Dashboard", {})} title='Add to stack' />
                <Button onPress={() => navigation.goBack()} title='go back' />
            </View>
        </View>
    );
};

export default Dashboard;