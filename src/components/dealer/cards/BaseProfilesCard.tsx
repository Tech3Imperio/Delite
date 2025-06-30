import { Button, Card, Image, Paragraph, XStack, Text } from 'tamagui'
import { useColorScheme, } from 'react-native'
import { Plus } from '@tamagui/lucide-icons'
import { useState } from 'react';
import { NewAccessorySheet } from '../sheets/NewAccessorySheet';
import { HandrailSelect } from '../../../lib/HandrailSelect';
import { BaseName, HandrailName } from '../../../types/product/common';
import { Baseselect } from '../../../lib/BaseSelect';
import { ModularBendHandrailSelect } from '../../../lib/ModularBendHandrailSelect';
import { AccessoryCode } from '../forms/AccessoryForms/AccessoryForms';

export type BaseCard = {
    name: string;
    image: string
    code: string
    keyName: keyof BaseName
    created_at?: string
}

export function BaseProfilesCard({ base, handleBaseSheet }: { base: BaseCard, handleBaseSheet: (baseKey: keyof BaseName) => void }) {
    const theme = useColorScheme()
    const bg = theme === 'light' ? "#f9f9f9" : "$black3"

    return (<>
        <Card size="$2" width="100%" height={150} bg={bg} borderRadius={12}>
            <XStack width="100%" height="100%" flexDirection="row" style={{ justifyContent: "center", alignItems: "center" }} gap={16} pt={16} pb={16} pl={16} pr={16}>
                <XStack flex={1} gap={8} flexDirection='column' style={{ justifyContent: "flex-start", alignItems: "flex-start" }} width="100%" height="100%">
                    <Text fontSize={20}>{base.name}</Text>
                    <Paragraph>{base.name}</Paragraph>
                </XStack>
                <XStack height="100%" flexDirection="column" style={{ justifyContent: "center", alignItems: "center" }}>
                    <Image
                        style={{ height: "100%", borderRadius: 12, objectFit: "cover", aspectRatio: 1 }}
                        source={{
                            uri: base.image
                        }}
                    />
                    <Button
                        themeInverse
                        width="min-content"
                        borderTopLeftRadius={20}
                        borderTopRightRadius={20}
                        borderBottomLeftRadius={20}
                        borderBottomRightRadius={20}
                        size="$2.5"
                        hoverStyle={{ bg: "darkgrey" }}
                        pressStyle={{ bg: "darkgrey" }}
                        style={{
                            marginTop: -20
                        }}
                        onPress={() => handleBaseSheet(base.keyName)}
                    >
                        <XStack gap="$1" style={{ justifyContent: "center", alignItems: "center" }}>
                            <Plus size={12} />
                            <Text fontSize={12}>Order</Text>
                        </XStack>
                    </Button>
                </XStack>
            </XStack>
        </Card >
    </>
    )
}