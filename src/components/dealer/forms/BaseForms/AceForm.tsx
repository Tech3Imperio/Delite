import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Input, XStack, YStack, Text, Button, ScrollView } from "tamagui";
import { useColorScheme } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useThemeColors } from "../../../../store/themeColors";
import { SelectDemo } from "../../../../lib/Select";
import { useEffect, useState } from "react";
import { getFinishCode } from "../../../../utils/dealer/getFinishCode";
import { QuantityInput } from "../../../../lib/QuantityInput";
import { Ace, createAceProtocol } from "../../../../types/product/base";
import { HandrailName } from "../../../../types/product/common";
import { Switch } from "tamagui";
import { HandrailSelect } from "../../../../lib/HandrailSelect";
import { HandrailFormSheet } from "./HandrailFormSheet";
import { Handrail } from "../../../../types/product/accessories";
import { SelectAnchorSize } from "../../../../lib/AnchorSizeSelect";

export const AceForm = ({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {

    console.log("In Ace form")

    const theme = useColorScheme()
    const themeColors = useThemeColors((state) => theme === "light" ? state.light_colors : state.dark_colors)
    const [handrailKey, setHandrailKey] = useState<keyof HandrailName | null>(null)
    const [hasHandrail, setHasHandrial] = useState<boolean>(false)
    const [openHandrailForm, setOpenHandrailForm] = useState<boolean>(false)
    const [openHandrailSelect, setOpenHandrailSelect] = useState<boolean>(false)

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<Ace>({
        resolver: zodResolver(createAceProtocol(handrailKey)),
        mode: "onBlur",
    })

    useEffect(() => {
        const color = watch("base.finish.color")
        const base = watch()
        console.log("Color", color, base)
        const code = color !== undefined && getFinishCode(color)
        console.log("In useEffect", code)
        if (code) {
            setValue("base.finish.code", code) // or a mapping function if needed
        }
    }, [watch("base.finish.color")])

    useEffect(() => {
        setValue("baseProfileID", "A50");
        setValue("base.anchor.anchorID", "CH")
        setValue("base.anchor.anchorType", "C10")
        setValue("base.anchor.baseProfileID", "A50")
        setValue("base.anchor.quantity", watch("base.quantity"))
        setValue("base.cover.finish.color", watch("base.finish.color"))
        setValue("base.cover.finish.code", watch("base.finish.code"))
        setValue("base.endCap.baseProfileID", watch("baseProfileID"))
        setValue("base.endCap.finish.color", watch("base.finish.color"))
        setValue("base.endCap.finish.code", watch("base.finish.code"))
        setValue("handrail", null)
        console.log("reached end of useEffect", watch())
    }, [watch("base.quantity")])

    useEffect(() => {
        console.log("Errors:", errors);
    }, [errors]);

    const addToBase = (data: Handrail<keyof HandrailName>) => {
        console.log("data from aceForm for handrail", data)
        setValue("handrail", data)
    }

    const setHandrailToNull = () => {
        setValue("handrail", null)
        console.log(watch("handrail"))
    }

    const handleCancel = () => {
        setHasHandrial(prev => !prev)
    }

    const handleHandrailFormSheet = (handrailName: keyof HandrailName) => {
        console.log("reached handleSheet", handrailName)
        setHandrailKey((prev) => prev = handrailName)
        setTimeout(() => {
            setOpenHandrailForm(!openHandrailForm)
        }, 100)
    }

    const onSubmit: SubmitHandler<Ace> = async (data) => {
        console.log("Data from Ace", data)
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
                                name="base.finish.color"
                            />
                            {errors.base?.finish?.color && (
                                <Text style={{ color: "red", fontSize: 12 }}>{errors.base.finish.color.message}</Text>
                            )}
                            <Controller
                                control={control}
                                rules={{
                                    maxLength: 100,
                                }}
                                render={({ field: { onBlur, value } }) => (
                                    <Input width={150} readOnly value={value?.toString()} size="$2" placeholder='Color Code' paddingBlock={0} onBlur={onBlur} placeholderTextColor={themeColors.ph_color} />
                                )}
                                name="base.finish.code"
                            />
                            {errors.base?.finish?.code && (
                                <Text style={{ color: "red", fontSize: 12 }}>{errors.base.finish.code.message}</Text>
                            )}
                        </XStack>
                    </YStack>
                    <XStack width={"70%"} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>Quantity</Text>
                        <Controller
                            control={control}
                            rules={{
                                maxLength: 100,
                            }}
                            defaultValue={0}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <QuantityInput value={value} onChange={onChange} onBlur={onBlur} />
                            )}
                            name="base.quantity"
                        />
                        {errors.base?.quantity && (
                            <Text style={{ color: "red", fontSize: 12, }}>{errors.base.quantity.message}</Text>
                        )}
                    </XStack>
                    <YStack style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "flex-start", gap: 8 }}>
                        <Controller
                            control={control}
                            rules={{
                                maxLength: 100,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <SelectAnchorSize onChange={onChange} onBlur={onBlur} value={value} />
                            )}
                            name="base.anchor.anchorSize"
                        />
                        {errors.base?.anchor?.anchorSize && (
                            <Text style={{ color: "red", fontSize: 12 }}>{errors.base.anchor.anchorSize.message}</Text>
                        )}
                    </YStack>
                    <YStack style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: 8 }}>
                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>End Cap Quantity</Text>
                        <XStack width={"70%"} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                            <Text style={{ fontSize: 14 }}>Left</Text>
                            <Controller
                                control={control}
                                rules={{
                                    maxLength: 100,
                                }}
                                defaultValue={0}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <QuantityInput value={value} onChange={onChange} onBlur={onBlur} />
                                )}
                                name="base.endCap.endCapLeftQuantity"
                            />
                            {errors.base?.endCap?.endCapLeftQuantity && (
                                <Text style={{ color: "red", fontSize: 12, }}>{errors.base.endCap.endCapRightQuantity?.message}</Text>
                            )}
                        </XStack>
                        <XStack width={"70%"} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                            <Text style={{ fontSize: 14 }}>Right</Text>
                            <Controller
                                control={control}
                                rules={{
                                    maxLength: 100,
                                }}
                                defaultValue={0}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <QuantityInput value={value} onChange={onChange} onBlur={onBlur} />
                                )}
                                name="base.endCap.endCapRightQuantity"
                            />
                            {errors.base?.endCap?.endCapLeftQuantity && (
                                <Text style={{ color: "red", fontSize: 12, }}>{errors.base.endCap.endCapRightQuantity?.message}</Text>
                            )}
                        </XStack>
                    </YStack>
                    <YStack style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: 8 }}>
                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>Cover Quantity</Text>
                        <XStack width={"70%"} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                            <Text style={{ fontSize: 14 }}>For 12mm</Text>
                            <Controller
                                control={control}
                                rules={{
                                    maxLength: 100,
                                }}
                                defaultValue={0}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <QuantityInput value={value} onChange={onChange} onBlur={onBlur} />
                                )}
                                name="base.cover.coverLength.0"
                            />
                            {errors.base?.cover?.coverLength?.[0] && (
                                <Text style={{ color: "red", fontSize: 12, }}>{errors.base.cover.coverLength[0].message}</Text>
                            )}
                        </XStack>
                        <XStack width={"70%"} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                            <Text style={{ fontSize: 14 }}>For 15mm</Text>
                            <Controller
                                control={control}
                                rules={{
                                    maxLength: 100,
                                }}
                                defaultValue={0}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <QuantityInput value={value} onChange={onChange} onBlur={onBlur} />
                                )}
                                name="base.cover.coverLength.1"
                            />
                            {errors.base?.cover?.coverLength?.[1] && (
                                <Text style={{ color: "red", fontSize: 12, }}>{errors.base.cover.coverLength[1].message}</Text>
                            )}
                        </XStack>
                    </YStack>
                    <YStack style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: 8 }}>
                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>Block Quantity</Text>
                        <XStack width={"70%"} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                            <Text style={{ fontSize: 14 }}>For 75mm</Text>
                            <Controller
                                control={control}
                                rules={{
                                    maxLength: 100,
                                }}
                                defaultValue={0}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <QuantityInput value={value} onChange={onChange} onBlur={onBlur} />
                                )}
                                name="base.blockSize.0"
                            />
                            {errors.base?.blockSize?.[0] && (
                                <Text style={{ color: "red", fontSize: 12, }}>{errors.base.blockSize[0].message}</Text>
                            )}
                        </XStack>
                        <XStack width={"70%"} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                            <Text style={{ fontSize: 14 }}>For 100mm</Text>
                            <Controller
                                control={control}
                                rules={{
                                    maxLength: 100,
                                }}
                                defaultValue={0}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <QuantityInput value={value} onChange={onChange} onBlur={onBlur} />
                                )}
                                name="base.blockSize.1"
                            />
                            {errors.base?.blockSize?.[1] && (
                                <Text style={{ color: "red", fontSize: 12, }}>{errors.base.blockSize[1].message}</Text>
                            )}
                        </XStack>
                        <XStack width={"70%"} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                            <Text style={{ fontSize: 14 }}>For 150mm</Text>
                            <Controller
                                control={control}
                                rules={{
                                    maxLength: 100,
                                }}
                                defaultValue={0}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <QuantityInput value={value} onChange={onChange} onBlur={onBlur} />
                                )}
                                name="base.blockSize.2"
                            />
                            {errors.base?.blockSize?.[2] && (
                                <Text style={{ color: "red", fontSize: 12, }}>{errors.base.blockSize[2].message}</Text>
                            )}
                        </XStack>
                        <XStack width={"70%"} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                            <Text style={{ fontSize: 14 }}>For 300mm</Text>
                            <Controller
                                control={control}
                                rules={{
                                    maxLength: 100,
                                }}
                                defaultValue={0}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <QuantityInput value={value} onChange={onChange} onBlur={onBlur} />
                                )}
                                name="base.blockSize.3"
                            />
                            {errors.base?.blockSize?.[3] && (
                                <Text style={{ color: "red", fontSize: 12, }}>{errors.base.blockSize[3].message}</Text>
                            )}
                        </XStack>
                    </YStack>
                    <XStack width={"49%"} style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>Handrail</Text>
                        <Switch
                            themeInverse
                            size="$1"
                            checked={hasHandrail}
                            onCheckedChange={async (checked) => {
                                setHasHandrial(prev => !prev)
                                if (checked) {
                                    setOpenHandrailSelect(prev => !prev)
                                }
                                if (!checked) {
                                    setHandrailToNull()
                                }
                            }}
                        >
                            <Switch.Thumb animation="quicker" />
                        </Switch>
                    </XStack>
                </ScrollView>
                <XStack gap={"$2"} style={{ alignSelf: "flex-end" }}>
                    <Button size={"$3"} style={{ alignSelf: "flex-end" }} width={100} variant="outlined" onPress={() => setOpen(prev => !prev)}>Cancel</Button>
                    <Button size={"$3"} style={{ alignSelf: "flex-end" }} width={100} themeInverse onPress={handleSubmit(onSubmit)}>Place Order</Button>
                </XStack>
            </YStack >
            {(openHandrailForm && handrailKey) && <HandrailFormSheet open={openHandrailForm} setOpen={setOpenHandrailForm} handrailName={handrailKey} handleCancel={handleCancel} addToBase={addToBase} />}
            {openHandrailSelect && (
                <HandrailSelect open={openHandrailSelect} setOpen={setOpenHandrailSelect} openAccessorySheet={handleHandrailFormSheet} />
            )}
        </>
    )
}