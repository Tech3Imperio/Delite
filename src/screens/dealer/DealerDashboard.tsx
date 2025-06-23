import React, { useContext, useState } from 'react';
import { useNavigation, StaticScreenProps, StackActions } from '@react-navigation/native';
import { View, Text, XStack } from 'tamagui';
import { AuthContext } from '../../navigation/auth/AuthContext';
import { removeToken } from '../../utils/auth/session';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Wrapper } from '../../lib/Wrapper';
import { Button } from 'tamagui';
import { Plus } from '@tamagui/lucide-icons';
import { NewOrderSheet } from '../../components/dealer/sheets/NewOrderSheet';
type DealerDashboardParamProp = StaticScreenProps<{}>
const DealerDashboard = ({ route }: DealerDashboardParamProp) => {
    const navigation = useNavigation<BottomTabNavigationProp<ReactNavigation.DealerParamsList>>()
    const { signOut } = useContext(AuthContext)
    const [open, setOpen] = useState<boolean>(false)
    return (
        <Wrapper>
            <View
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: "row", gap: 8 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <Text>Dealer Screen</Text>
                    <Button size="$3" onPress={() => navigation.goBack()} themeInverse>Go back</Button>
                    <Button size="$3" themeInverse onPress={() => {
                        signOut()
                        removeToken()
                    }}>Sign Out</Button>
                </View>
            </View>
            <Button
                themeInverse
                borderTopLeftRadius={20}
                borderTopRightRadius={20}
                borderBottomLeftRadius={20}
                borderBottomRightRadius={20}
                size="$3.5"
                position="absolute"
                style={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20,
                    zIndex: 100,
                    elevation: 4,
                }}
                hoverStyle={{ bg: "$blue9" }}
                pressStyle={{ bg: "darkgrey" }}
                onPress={() => setOpen((open) => !open)}
            >
                <XStack style={{ alignItems: "center" }} gap="$1">
                    <Plus size={16} />
                    <Text>Order</Text>
                </XStack>
            </Button>
            {
                open === true ? <NewOrderSheet setOpen={setOpen} open={open} /> : <></>
            }
        </Wrapper>
    );
};

export default DealerDashboard;