import React from 'react'
import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import type { SelectProps } from 'tamagui'
import { Adapt, Text, Select, Sheet, YStack } from 'tamagui'
import { Noop } from 'react-hook-form'

type SelectGlassThicknessProps = {
    value: number
    onChange: (...event: any[]) => void,
    onBlur: Noop
}

export function SelectGlassThickness<T>({ onChange, onBlur, value }: SelectGlassThicknessProps) {
    return (
        <YStack gap="$2" style={{ width: 150, alignItems: "start", justifyContent: "flex-start", gap: 12 }}>
            <Text htmlFor='select-demo-1' style={{ fontSize: 14, fontWeight: "bold" }}>Glass Thickness</Text>
            <SelectGlassThicknessItem id="select-demo-1" value={value?.toString()}
                onChange={onChange}
                onBlur={onBlur} />
        </YStack>
    )
}
type SelectGlassThicknessItemProps = SelectProps & {
    value: string
    onChange: (...event: any[]) => void
    onBlur: Noop
}
export function SelectGlassThicknessItem<T>({ value,
    onChange,
    onBlur,
    ...props }: SelectGlassThicknessItemProps & { trigger?: React.ReactNode }) {


    return (
        <Select value={value} onValueChange={(val) => onChange(Number(val))} disablePreventBodyScroll {...props}>
            {props?.trigger || (
                <Select.Trigger maxWidth={150} size={"$2"} iconAfter={ChevronDown} padding={10} pt={0} pb={0} height={28} fontSize={8}>
                    <Select.Value fontSize={14} placeholder={"Glass Thickness"} />
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
                                            key={item.glassThickness}
                                            value={item.glassThickness.toString()}
                                            size={"$3"}
                                        >
                                            <Select.ItemText>{item.glassThickness}</Select.ItemText>
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
    { glassThickness: 12 },
    { glassThickness: 13.52 },
    { glassThickness: 17.52 },
    { glassThickness: 21.52 },
]