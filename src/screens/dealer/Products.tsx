import React from 'react';
import { Text } from 'react-native'; // Import necessary components

import { View } from 'tamagui';
const Products = () => {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: "row" }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>All Products</Text>
            </View>
        </View>
    );
};

export default Products;