import React from 'react';
import { SafeAreaView, View, Text, Pressable } from 'react-native'; // Import necessary components

const Home = ({ navigation }) => {
    return (
        <SafeAreaView
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: "row" }}>
            <Text accessibilityRole='header'>React Native Fun!</Text>
            <View><Text>Hi Hello</Text></View>
            <Pressable
                style={{ padding: 8, backgroundColor: "yellow", borderRadius: 12, cursor: "pointer" }}
                onPress={() =>
                    navigation.navigate('Profile', { name: 'Jane' })
                }
            ><Text accessibilityRole='header'>Go to Jane's profile</Text></Pressable>
        </SafeAreaView>
    );
};

export default Home;