import { Button, Card, Image, Paragraph, XStack, Text } from 'tamagui'
import { useColorScheme, } from 'react-native'
import { Plus } from '@tamagui/lucide-icons'
import { NewOrderSheet } from '../newOrder/NewOrderSheet';
import { useState } from 'react';

export type Accessory = {
    name: string;
    description: string;
    thumbnail: string
    code: string
    created_at?: string
}

export function AccessoriesCard({ accessory }: { accessory: Accessory }) {
    const theme = useColorScheme()
    const bg = theme === 'light' ? "$white2" : "$black3"
    const [open, setOpen] = useState<boolean>(false)

    return (<>
        <Card size="$2" width="100%" height={150} bg={bg} borderRadius={12}>
            <XStack width="100%" height="100%" flexDirection="row" style={{ justifyContent: "center", alignItems: "center" }} gap={16} pt={16} pb={16} pl={16} pr={16}>
                <XStack flex={1} gap={8} flexDirection='column' style={{ justifyContent: "flex-start", alignItems: "flex-start" }} width="100%" height="100%">
                    <Text fontSize={20}>{accessory.name}</Text>
                    <Paragraph>{accessory.description}</Paragraph>
                </XStack>
                <XStack height="100%" flexDirection="column" style={{ justifyContent: "center", alignItems: "center" }}>
                    <Image
                        style={{ height: "100%", borderRadius: 12, objectFit: "cover", aspectRatio: 1 }}
                        source={{
                            uri: accessory.thumbnail
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
                        onPress={() => setOpen(true)}
                    >
                        <XStack gap="$1" style={{ justifyContent: "center", alignItems: "center" }}>
                            <Plus size={12} />
                            <Text fontSize={12}>Order</Text>
                        </XStack>
                    </Button>
                </XStack>
            </XStack>
        </Card >
        {open && <NewOrderSheet open={open} setOpen={setOpen} />}
    </>
    )
}