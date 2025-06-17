import React from 'react'
import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import type { SelectProps } from 'tamagui'
import { Adapt, Label, Select, Sheet, XStack, YStack } from 'tamagui'
import { FinishName } from '../types/product/common'
export function SelectDemo() {
    return (
        <YStack gap="$4">
            <XStack gap="$4" style={{ width: "100%", alignItems: "center" }}>
                <Label htmlFor="select-demo-1" flex={1} style={{ minWidth: 80 }}>
                    Finish
                </Label>
                <SelectDemoItem id="select-demo-1" />
            </XStack>
        </YStack>
    )
}

export function SelectDemoItem(props: SelectProps & { trigger?: React.ReactNode }) {
    const [val, setVal] = React.useState(items[0].name.toLowerCase())

    return (
        <Select value={val} onValueChange={setVal} disablePreventBodyScroll {...props} >
            {props?.trigger || (
                <Select.Trigger maxWidth={150} iconAfter={ChevronDown} padding={10} fontSize={8}>
                    <Select.Value fontSize={14} />
                </Select.Trigger>
            )}

            <Adapt platform="touch">
                <Sheet native={true} modal animation="medium" snapPoints={[35]}>
                    <Sheet.Frame>
                        <Sheet.ScrollView>
                            <Adapt.Contents />
                        </Sheet.ScrollView>
                    </Sheet.Frame>
                    <Sheet.Overlay
                        bg="$shadowColor"
                        animation="lazy"
                        enterStyle={{ opacity: 0 }}
                        exitStyle={{ opacity: 0 }}
                    />
                </Sheet>
            </Adapt>

            <Select.Content zIndex={200000}>
                <Select.ScrollUpButton
                    position="relative"
                    width="100%"
                    height="$3"
                    style={{ alignItems: "center", justifyContent: "center" }}
                >
                    <YStack style={{ zIndex: 10 }}>
                        <ChevronUp size={20} />
                    </YStack>
                </Select.ScrollUpButton>
                <Select.Viewport
                    style={{ minWidth: 100 }}
                >
                    <Select.Group>
                        {React.useMemo(
                            () =>
                                items.map((item, i) => {
                                    return (
                                        <Select.Item
                                            index={i}
                                            key={item.name}
                                            value={item.name.toLowerCase()}
                                        >
                                            <Select.ItemText>{item.name}</Select.ItemText>
                                            <Select.ItemIndicator marginLeft="auto">
                                                <Check size={16} />
                                            </Select.ItemIndicator>
                                        </Select.Item>
                                    )
                                }),
                            [items]
                        )}
                    </Select.Group>
                </Select.Viewport>
                <Select.ScrollDownButton
                    position="relative"
                    width="100%"
                    height="$3"
                    style={{ alignItems: "center", justifyContent: "center" }}
                >
                    <YStack style={{ zIndex: 10 }}>
                        <ChevronDown size={20} />
                    </YStack>
                </Select.ScrollDownButton>
            </Select.Content>
        </Select >
    )
}

const items = [
    { name: FinishName.BLACK },
    { name: FinishName.CHAMPAGNE },
    { name: FinishName.CUSTOM },
    { name: FinishName.RAW },
    { name: FinishName.SILVER },
    { name: FinishName.WOOD },
]