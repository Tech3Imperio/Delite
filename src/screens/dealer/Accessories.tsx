import React from 'react';

import { View, Text } from 'tamagui';
import { Wrapper } from '../../lib/wrapper';
const Accessories = () => {
    return (
        <Wrapper>
            <View
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: "row" }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>All Accessories</Text>
                </View>
            </View>
        </Wrapper>
    );
};

export default Accessories;