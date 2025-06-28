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
import { Baseselect } from '../../lib/BaseSelect';
import { BaseName } from '../../types/product/common';
type DealerDashboardParamProp = StaticScreenProps<{}>
const DealerDashboard = ({ route }: DealerDashboardParamProp) => {
    const navigation = useNavigation<BottomTabNavigationProp<ReactNavigation.DealerParamsList>>()
    const { signOut } = useContext(AuthContext)
    const [openBaseList, setOpenBaseList] = useState<boolean>(false)
    const [base, setBase] = useState<keyof BaseName | null>(null)
    const [openBaseSheet, setOpenBaseSheet] = useState<boolean>(false)

    const handleBaseSheet = (baseName: keyof BaseName) => {
        console.log("reached handleSheet", baseName)
        setBase((prev) => prev = baseName)
        setTimeout(() => {
            setOpenBaseSheet(true)
        }, 100)
    }
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
                onPress={() => setOpenBaseList((open) => !open)}
            >
                <XStack style={{ alignItems: "center" }} gap="$1">
                    <Plus size={16} />
                    <Text>Order</Text>
                </XStack>
            </Button>
            {openBaseList && (
                <Baseselect open={openBaseList} setOpen={setOpenBaseList} openAccessorySheet={handleBaseSheet} />
            )}
            {base && openBaseSheet ? <NewOrderSheet open={openBaseSheet} setOpen={setOpenBaseSheet} baseKey={base} /> : <></>}
        </Wrapper>
    );
};

export default DealerDashboard;