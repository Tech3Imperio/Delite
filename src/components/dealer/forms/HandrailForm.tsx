import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Input, XStack, YStack, Text, Button, View, ScrollView } from "tamagui";
import { useColorScheme } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useThemeColors } from "../../../store/themeColors";
import { createHandRailProtocol, Handrail } from "../../../types/product/accessories";
import { SelectDemo } from "../../../lib/Select";
import { useEffect } from "react";
import { getFinishCode } from "../../../utils/dealer/getFinishCode";
import { QuantityInput } from "../../../lib/QuantityInput";
import { HandrailName, HandrailType } from "../../../types/product/common";
import { handrailValues } from "../../../lib/HandrailSelect";
import { SelectGlassThickness } from "../../../lib/SelectGlassThickness";
export function HandrailForm<K extends keyof HandrailName>({ handrailKey, setOpen }: { handrailKey: K, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    console.log("In Handrail form")
    const isModularBend = handrailKey === "ROUND50" || handrailKey === "SQUARE40" || handrailKey === "SQUARE50"
    const theme = useColorScheme()
    const themeColors = useThemeColors((state) => theme === "light" ? state.light_colors : state.dark_colors)
    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<Handrail<keyof HandrailName>>({
        resolver: zodResolver(createHandRailProtocol(handrailKey)),
        mode: "onBlur",
    })

    const accessoryKeys = [
        "corner",
        "endCap",
        "wallBracket",
        "epdmRubber",
        "joiner",
        "modularBend"
    ] as const;

    useEffect(() => {
        const color = watch("finish.color")
        const thickness = watch("glassThickness")
        console.log("Color", color)
        const code = color !== undefined && getFinishCode(color)
        console.log("In useEffect", code)
        if (code) {
            setValue("finish.code", code) // or a mapping function if nethieded
        }
        setValue("handrailType", handrailValue.name as Handrail<K>["handrailType"]);
        setValue("handrailCode", handrailValue.code as Handrail<K>["handrailCode"]);
        for (const key of accessoryKeys) {
            setValue(`accessories.${key}.handrailType`, handrailValue.name);
            setValue(`accessories.${key}.handrailCode`, handrailValue.code);
            setValue(`accessories.${key}.finish.color`, color);
            if (code) {
                setValue(`accessories.${key}.finish.code`, code);
            }
        }
        setValue("accessories.epdmRubber.glassThickness", thickness)
        if (!isModularBend) {
            setValue("accessories.modularBend", null)
        }
        console.log("reached end of useEffect")
    }, [watch("finish.color"), watch("glassThickness")])

    const handrailValue: HandrailType<typeof handrailKey> = handrailValues[handrailKey];

    const onSubmit: SubmitHandler<Handrail<keyof HandrailName>> = async (data) => {
        console.log("Data from Handrail", data)
        // try {
        //     const response = await fetch(`${getApiBaseUrl()}/auth/signin`, {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify(data),
        //     });
        //     const result = await response.json();
        //     if (result.success) {
        //         await storeToken(result.access_token)
        //         signIn(result.role)
        //     }
        // } catch (error) {
        //     if (error instanceof Error) {
        //         console.error("Sign-in error:", error.message);
        //     } else {
        //         console.error("Sign-in error:", error);
        //     }
        // }
    };

    return (
        <>
            <YStack id="Test" flex={1} style={{ alignItems: "start", justifyContent: "space-between", gap: 16 }}>
                <ScrollView width={"100%"} contentContainerStyle={{
                    verticalAlign: "center",
                    justify: 'flex-start',
                    gap: 16
                }}>
                    <YStack style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: 16 }}>
                        <Text style={{ fontSize: 14 }}>Handrail Name</Text>
                        <Input
                            defaultValue={handrailValue.name}
                            editable={false}
                            size="$3"
                            pt={0}
                            pb={0}
                            placeholder="Handrail Code"
                            placeholderTextColor={themeColors.ph_color}
                        />
                    </YStack>
                    <YStack style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: 16 }}>
                        <Text style={{ fontSize: 14 }}>Handrail Code</Text>
                        <Input
                            defaultValue={handrailValue.code}
                            editable={false}
                            size="$3"
                            pt={0}
                            pb={0}
                            placeholder="Handrail Code"
                            placeholderTextColor={themeColors.ph_color}
                        />
                    </YStack>
                    <YStack style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: 16 }}>
                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>Length</Text>
                        <View style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "flex-start", gap: 8 }}>
                            <XStack width={"65%"} style={{ justifyContent: "space-between", alignItems: "center", gap: 24 }}>
                                <Text style={{ fontSize: 14 }}>For 12mm</Text>
                                <YStack style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "flex-start", gap: 8 }}>
                                    <Controller
                                        control={control}
                                        rules={{
                                            maxLength: 100,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <QuantityInput value={value} onChange={onChange} onBlur={onBlur} />
                                        )}
                                        name="length.0"
                                    />
                                    {errors.length?.[0] && (
                                        <Text style={{ color: "red", fontSize: 12, }}>{errors.length[0].message}</Text>
                                    )}
                                </YStack>
                            </XStack>
                            <XStack width={"65%"} style={{ justifyContent: "space-between", alignItems: "center", gap: 24 }}>
                                <Text style={{ fontSize: 14 }}>For 15mm</Text>
                                <YStack style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "flex-start", gap: 8 }}>
                                    <Controller
                                        control={control}
                                        rules={{
                                            maxLength: 100,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <QuantityInput value={value} onChange={onChange} onBlur={onBlur} />
                                        )}
                                        name="length.1"
                                    />
                                    {errors.length?.[1] && (
                                        <Text style={{ color: "red", fontSize: 12 }}>{errors.length[1].message}</Text>
                                    )}
                                </YStack>
                            </XStack>
                        </View>
                    </YStack>
                    <YStack style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: 16 }}>
                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>End Cap Quantity</Text>
                        <View style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "flex-start", gap: 8 }}>
                            <XStack width={"65%"} style={{ justifyContent: "space-between", alignItems: "center", gap: 24 }}>
                                <Text style={{ fontSize: 14 }}>Left</Text>
                                <YStack style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "flex-start", gap: 8 }}>
                                    <Controller
                                        control={control}
                                        rules={{
                                            maxLength: 100,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <QuantityInput value={value} onChange={onChange} onBlur={onBlur} />
                                        )}
                                        name="accessories.endCap.endCapLeftQuantity"
                                    />
                                    {errors.accessories?.endCap?.endCapLeftQuantity && (
                                        <Text style={{ color: "red", fontSize: 12, }}>{errors.accessories.endCap.endCapLeftQuantity.message}</Text>
                                    )}
                                </YStack>
                            </XStack>
                            <XStack width={"65%"} style={{ justifyContent: "space-between", alignItems: "center", gap: 24 }}>
                                <Text style={{ fontSize: 14 }}>Right</Text>
                                <YStack style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "flex-start", gap: 8 }}>
                                    <Controller
                                        control={control}
                                        rules={{
                                            maxLength: 100,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <QuantityInput value={value} onChange={onChange} onBlur={onBlur} />
                                        )}
                                        name="accessories.endCap.endCapRightQuantity"
                                    />
                                    {errors.accessories?.endCap?.endCapRightQuantity && (
                                        <Text style={{ color: "red", fontSize: 12, }}>{errors.accessories.endCap.endCapRightQuantity.message}</Text>
                                    )}
                                </YStack>
                            </XStack>
                        </View>
                    </YStack>
                    <YStack style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "flex-start", gap: 8 }}>
                        <XStack style={{ display: "flex", flexDirection: "row", alignItems: "flex-end", justifyContent: "flex-start", gap: 16 }}>
                            <Controller
                                control={control}
                                rules={{
                                    maxLength: 100,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <SelectDemo onChange={onChange} onBlur={onBlur} value={value} />
                                )}
                                name="finish.color"
                            />
                            {errors.finish?.color && (
                                <Text style={{ color: "red", fontSize: 12 }}>{errors.finish.color.message}</Text>
                            )}
                            <Controller
                                control={control}
                                rules={{
                                    maxLength: 100,
                                }}
                                render={({ field: { onBlur, value } }) => (
                                    <Input width={150} readOnly value={value?.toString()} size="$2" placeholder='Color Code' paddingBlock={0} onBlur={onBlur} placeholderTextColor={themeColors.ph_color} />
                                )}
                                name="finish.code"
                            />
                            {errors.finish?.code && (
                                <Text style={{ color: "red", fontSize: 12 }}>{errors.finish.code.message}</Text>
                            )}
                        </XStack>
                    </YStack>
                    <YStack style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "flex-start", gap: 8 }}>
                        <Controller
                            control={control}
                            rules={{
                                maxLength: 100,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <SelectGlassThickness onChange={onChange} onBlur={onBlur} value={value} />
                            )}
                            name="glassThickness"
                        />
                        {errors.glassThickness && (
                            <Text style={{ color: "red", fontSize: 12 }}>{errors.glassThickness.message}</Text>
                        )}
                    </YStack>
                    <YStack style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>Accessories Quantity</Text>
                        <View style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "flex-start", gap: 8 }}>
                            <XStack width={"65%"} style={{ justifyContent: "space-between", alignItems: "center", gap: 24 }}>
                                <Text style={{ fontSize: 14 }}>Corner</Text>
                                <YStack style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "flex-start", gap: 8 }}>
                                    <Controller
                                        control={control}
                                        rules={{
                                            maxLength: 100,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <QuantityInput value={value} onChange={onChange} onBlur={onBlur} />
                                        )}
                                        name="accessories.corner.cornerQuantity"
                                    />
                                    {errors.accessories?.corner?.cornerQuantity && (
                                        <Text style={{ color: "red", fontSize: 12, }}>{errors.accessories.corner.cornerQuantity.message}</Text>
                                    )}
                                </YStack>
                            </XStack>
                            <XStack width={"65%"} style={{ justifyContent: "space-between", alignItems: "center", gap: 24 }}>
                                <Text style={{ fontSize: 14 }}>Wall Bracket</Text>
                                <YStack style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "flex-start", gap: 8 }}>
                                    <Controller
                                        control={control}
                                        rules={{
                                            maxLength: 100,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <QuantityInput value={value} onChange={onChange} onBlur={onBlur} />
                                        )}
                                        name="accessories.wallBracket.wallBracketQuantity"
                                    />
                                    {errors.accessories?.wallBracket?.wallBracketQuantity && (
                                        <Text style={{ color: "red", fontSize: 12 }}>{errors.accessories.wallBracket.wallBracketQuantity.message}</Text>
                                    )}
                                </YStack>
                            </XStack>
                            <XStack width={"65%"} style={{ justifyContent: "space-between", alignItems: "center", gap: 24 }}>
                                <Text style={{ fontSize: 14 }}>EPDM Rubber</Text>
                                <YStack style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "flex-start", gap: 8 }}>
                                    <Controller
                                        control={control}
                                        rules={{
                                            maxLength: 100,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <QuantityInput value={value} onChange={onChange} onBlur={onBlur} />
                                        )}
                                        name="accessories.epdmRubber.epdmRubberQuantity"
                                    />
                                    {errors.accessories?.epdmRubber?.epdmRubberQuantity && (
                                        <Text style={{ color: "red", fontSize: 12 }}>{errors.accessories.epdmRubber.epdmRubberQuantity.message}</Text>
                                    )}
                                </YStack>
                            </XStack>
                            <XStack width={"65%"} style={{ justifyContent: "space-between", alignItems: "center", gap: 24 }}>
                                <Text style={{ fontSize: 14 }}>Joiner</Text>
                                <YStack style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "flex-start", gap: 8 }}>
                                    <Controller
                                        control={control}
                                        rules={{
                                            maxLength: 100,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <QuantityInput value={value} onChange={onChange} onBlur={onBlur} />
                                        )}
                                        name="accessories.joiner.joinerQuantity"
                                    />
                                    {errors.accessories?.joiner?.joinerQuantity && (
                                        <Text style={{ color: "red", fontSize: 12 }}>{errors.accessories.joiner.joinerQuantity.message}</Text>
                                    )}
                                </YStack>
                            </XStack>
                            {
                                isModularBend && (
                                    <XStack width={"65%"} style={{ justifyContent: "space-between", alignItems: "center", gap: 24 }}>
                                        <Text style={{ fontSize: 14 }}>Modular Bend</Text>
                                        <YStack style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "flex-start", gap: 8 }}>
                                            <Controller
                                                control={control}
                                                rules={{
                                                    maxLength: 100,
                                                }}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <QuantityInput value={value} onChange={onChange} onBlur={onBlur} />
                                                )}
                                                name="accessories.modularBend.modularBendQuantity"
                                            />
                                            {errors.accessories?.modularBend?.modularBendQuantity && (
                                                <Text style={{ color: "red", fontSize: 12 }}>{errors.accessories.modularBend.modularBendQuantity.message}</Text>
                                            )}
                                        </YStack>
                                    </XStack>
                                )
                            }
                        </View>
                    </YStack>
                </ScrollView>
                <XStack gap={"$2"} style={{ alignSelf: "flex-end" }}>
                    <Button size={"$3"} style={{ alignSelf: "flex-end" }} width={100} variant="outlined" onPress={() => setOpen(prev => !prev)}>Cancel</Button>
                    <Button size={"$3"} style={{ alignSelf: "flex-end" }} width={100} themeInverse onPress={handleSubmit(onSubmit)}>Place Order</Button>
                </XStack>
            </YStack>
        </>
    )
}